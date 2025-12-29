import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) =>
    cb(null, `${uuid()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

export default router;
