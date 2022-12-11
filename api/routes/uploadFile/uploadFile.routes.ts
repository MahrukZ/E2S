import uploadFile from "../../emailConfig/saveFile";
import express from "express";
const router = express.Router();

router.post("/uploadFile", uploadFile.single("file"), (req, res, next) => {
  try {
    return res.status(201).json({
      message: "File uplodeded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "File did not upload successfully",
    });
  }
});

export default router;
