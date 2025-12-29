import express from "express";
import { enqueueJob } from "../services/jobQueue.js";

const router = express.Router();

router.post("/", (req, res) => {
  const jobId = enqueueJob(req.body);
  res.json({ jobId });
});

export default router;
