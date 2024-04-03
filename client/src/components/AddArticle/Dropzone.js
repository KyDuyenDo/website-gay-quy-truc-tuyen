import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const Dropzone = ({ className, setValue, errorImage }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setValue("image", files);
    console.log(files);
  }, [files]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    console.log(rejectedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 3,
    maxSize: 2 * 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div
          style={{ paddingTop: "15px" }}
          className="d-flex flex-column align-items-center justify-content-center gap-3"
        >
          <FontAwesomeIcon icon={faUpload} size="2x" />
          {isDragActive ? (
            <p>Thả tập tin vào đây...</p>
          ) : (
            <p>Kéo và thả file vào đây hoặc click để chọn file</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="" style={{ padding: "20px 0px" }}>
        <div className="d-flex justify-content-between">
          <h2 className="title-text">Xem trước</h2>
          <button
            type="button"
            onClick={removeAll}
            className="custom-button-up"
          >
            xóa tất cả
          </button>
          {/* <button type="submit" className="custom-button-right">
            Tải lên tất cả
          </button> */}
        </div>

        {/* Accepted files */}
        <h3 className="title-main"></h3>
        {errorImage !== "" ? (
          <small className="text-danger m-1 p-0">{errorImage}</small>
        ) : (
          ""
        )}
        <ul className="grid-container">
          {files.map((file) => (
            <li key={file.name} className="custom-element">
              <img
                src={file.preview}
                alt={file.name}
                style={{ width: "150px", height: "100px" }}
                className="image-container"
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
              <button
                type="button"
                className="custom-icon-files"
                onClick={() => removeFile(file.name)}
              >
                <FontAwesomeIcon icon={faXmarkCircle} size="1x" />
              </button>
              <p className="custom-text-files">{file.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dropzone;
