// import * as multer from 'multer';
// import MulterGoogleCloudStorage from 'multer-google-storage';
const multer = require("multer");
const multerGoogleStorage = require("multer-google-storage");
import { Storage } from "@google-cloud/storage";

const bucket = process.env.GCS_BUCKET;
const projectId = process.env.GCLOUD_PROJECT;
const keyFilename = process.env.GCS_KEYFILE;

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    maxRetries: 3,
    bucket: bucket,
    projectId: projectId,
    keyFilename: keyFilename,
    filename: (req, file, cb) => {
      cb(null, `images/${Date.now()}_${req.currentUserId}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
});

const gcs = new Storage({
  keyFilename: keyFilename,
  projectId: projectId,
});

const gcsBucket = gcs.bucket(bucket);

export { uploadHandler, gcsBucket };
