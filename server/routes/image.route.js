const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const MongoDB = require("../utils/mongodb.util");
const base64 = require("base-64");

router.post("/upload/:type", async function (request, result) {
  const type = request.params.type;
  const bucket = MongoDB.bucket(type);
  const form = new formidable.IncomingForm();
  let fields;
  let files;
  [fields, files] = await form.parse(request);
  const file = files.file[0];
  //return result.json(file.originalFilename);
  const filePath = new Date().getTime() + "-" + file.originalFilename;
  fs.createReadStream(file.filepath)
    .pipe(
      bucket.openUploadStream(filePath, {
        // maximum size for each chunk (in bytes)
        chunkSizeBytes: 1048576, // 1048576 = 1 MB
        // metadata of the file
        metadata: {
          name: file.originalFilename, // file name
          size: file.size, // file size (in bytes)
          type: file.mimetype, // type of file
        },
      })
    )
    .on("finish", function () {
      return result.status(200).json({
        imageURL: `http://localhost:5000/image/${type}/${filePath}`,
      });
    });
});

router.get("/:type/:filename", async function (request, result) {
  // get file name from URL
  const { filename, type } = request.params;
  const bucket = MongoDB.bucket(type);

  // get file from GridFS bucket
  const files = await bucket
    .find({
      filename: filename,
    })
    .toArray();

  // return error if file not found
  if (!files || files.length == 0) {
    return result.status(404).json({
      error: "File does not exists.",
    });
  }
  bucket.openDownloadStreamByName(filename).pipe(result);
});

router.get("/data/:type/:filename", async function (request, response) {
  const { filename, type } = request.params;
  const bucket = MongoDB.bucket(type);

  try {
    const [file] = await bucket.find({ filename }).toArray();
    if (!file) {
      return response.status(404).json({ error: "File does not exist." });
    }
    const chunks = [];
    let completeData; // Declare completeData outside the Promise

    const downloadStream = bucket.openDownloadStreamByName(filename);
    // Buffer
    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    downloadStream.on("error", (error) => {
      console.error("Error downloading file:", error);
      return response.status(500).json({ error: "Internal server error." });
    });

    downloadStream.on("end", () => {
      completeData = Buffer.concat(chunks);
      const imageBase64 = completeData.toString("base64");
      response.status(200).json(imageBase64);
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    return response.status(500).json({ error: "Internal server error." });
  }
});

router.post("/:type/del/:_id", async function (request, result) {
  const { _id, type } = request.params;
  const bucket = MongoDB.bucket(type);
  const objectId = new ObjectId(_id);
  await bucket.delete(objectId);
  //return response
  return result.status(200).json({ message: "File has been deleted." });
});

module.exports = router;
