import { analyzeJobMatch } from "../utils/analyzeJobMatch.js";
import pdfParse from "pdf-parse"; // ⬅ install this
import fs from "fs/promises";
import path from "path";
import JobMatchSchema from "../models/jobMatchSchema.model.js";

export const jobMatchController = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!req.file || !jobDescription) {
      console.log("Missing file or job description");
      return res.status(400).json({ error: "PDF and job description required" });
    }

    console.log("📄 Received file:", req.file);
    const filePath = req.file.path;

    const dataBuffer = await fs.readFile(filePath);
    console.log("✅ PDF loaded from path");

    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;
    console.log("✅ Resume text extracted");

    const result = await analyzeJobMatch(resumeText, jobDescription);
    console.log("✅ AI result:", result);

    const newReport = new JobMatchSchema({
      user: req.user._id,
      resumeText,
      jobDescription,
      result,
    });

    await newReport.save();
    console.log("✅ Saved to DB");

    return res.json({
      message: "Job match analysis saved successfully",
      data: newReport,
    });
  } catch (err) {
    console.error("❌ Match error:", err.message);
    res.status(500).json({ error: "Failed to analyze job match" });
  }
};
