import express from "express";
import { analyzeApplication, closeModel } from "./qvac.js";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

app.post("/api/analyze", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        error: "Please provide both a resume and a job description."
      });
    }

    const result = await analyzeApplication(resume, jobDescription);

    res.json({ result });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      error: error.message || "Analysis failed."
    });
  }
});

process.on("SIGINT", async () => {
  await closeModel();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`\nSmartFitz running at http://localhost:${PORT}\n`);
});
