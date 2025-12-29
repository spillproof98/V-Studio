import express from "express";
import cors from "cors";
import uploadRoute from "./routes/upload.js";
import exportRoute from "./routes/export.js";
import statusRoute from "./routes/status.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/outputs", express.static("outputs"));
app.use("/waveforms", express.static("waveforms"));

app.use("/upload", uploadRoute);
app.use("/export", exportRoute);
app.use("/status", statusRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend running on http://localhost:4000");
});
