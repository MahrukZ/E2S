import multer from "multer";
import path from "path";

// Reference
// Taken from https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f
// Function used to store file on the disk

const storeFile = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, "report" + path.extname(file.originalname));
  },
});

// Function used to check file format before saving on the disk

const checkFileFormat = (req: any, file: any, cb: any) => {
  if (file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadFile = multer({
  storage: storeFile,
  fileFilter: checkFileFormat,
});

// Reference ends

export default uploadFile;
