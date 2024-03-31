const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

class MongoDB {
  static connect = async (uri) => {
    try {
      await mongoose.connect(uri);
      const db = mongoose.connection.db;
      console.log("MongoDB connected!");
      // Tạo các bucket
      this.buckets = {
        avatar: new GridFSBucket(db, { bucketName: "avatar" }),
        article: new GridFSBucket(db, { bucketName: "article" }),
        activity: new GridFSBucket(db, { bucketName: "activity" }),
        identifyCard: new GridFSBucket(db, { bucketName: "identifyCard" }),
        identifyAvatar: new GridFSBucket(db, { bucketName: "identifyAvatar" }),
        category: new GridFSBucket(db, { bucketName: "category" }),
      };
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  };

  static bucket(name) {
    if (!this.buckets[name]) throw new Error(`Bucket ${name} not found`);
    return this.buckets[name];
  }
}

module.exports = MongoDB;
