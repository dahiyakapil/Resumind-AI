
import fs from "fs";
import axios from "axios";
import tmp from "tmp-promise";
import { extractPdfText } from "../utils/extractPdfText.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { analyzeWithOpenRouter } from "../utils/analyzeWithOpenRouter.js";
import ResumeReport from "../models/ResumeReport.model.js";
import PDFDocument from "pdfkit";
import { rewriteAISuggestionWithOpenRouter } from "../utils/rewriteAISuggestionWithOpenRouter.js";


// ✅ Analyze Resume - POST /resume/analyze
// export const analyzeResume = async (req, res) => {
//   const filePath = req.file?.path;
//   const resumeName = req.file?.originalname || "resume.pdf"; // ✅ Extract file name

//   try {
//     if (!filePath) return res.status(400).json({ error: "No file uploaded" });

//     const extractedText = await extractPdfText(filePath);
//     if (!extractedText || extractedText.trim().length < 20) {
//       return res.status(422).json({ error: "Text extraction failed or resume is too short" });
//     }

//     const resumeUrl = await uploadToCloudinary(filePath);
//     const aiReport = await analyzeWithOpenRouter(extractedText);

//     const savedReport = await ResumeReport.create({
//       user: req.user._id,
//       fileUrl: resumeUrl,
//       aiFeedback: JSON.stringify(aiReport),
//       score: aiReport.ats_score || 0,
//       resumeName, // ✅ Save filename
//     });

//     return res.status(200).json({
//       message: "Resume analyzed and saved successfully",
//       resumeUrl,
//       analysis: aiReport,
//       reportId: savedReport._id,
//       createdAt: savedReport.createdAt,
//       resumeName, // ✅ Return filename
//     });

//   } catch (err) {
//     return res.status(500).json({ error: "Resume analysis failed: " + err.message });
//   } finally {
//     if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }
// };



// ✅ Analyze Resume - POST /resume/analyze
// export const analyzeResume = async (req, res) => {
//   const filePath = req.file?.path;
//   const resumeName = req.file?.originalname || "resume.pdf"; // ✅ Extract file name

//   try {
//     if (!filePath) return res.status(400).json({ error: "No file uploaded" });

//     const extractedText = await extractPdfText(filePath);
//     if (!extractedText || extractedText.trim().length < 20) {
//       return res.status(422).json({ error: "Text extraction failed or resume is too short" });
//     }

//     const resumeUrl = await uploadToCloudinary(filePath);
//     const aiReportRaw = await analyzeWithOpenRouter(extractedText);

//     // ✅ Limit buzzwords to top 10 and exclude ATS sections
//     const atsKeywords = [
//       "summary", "experience", "project", "skill", "education", "certification", "award", "honor"
//     ];

//     const buzzwords = (aiReportRaw.buzzwords || []).filter(
//       (word, index) =>
//         index < 15 && !atsKeywords.some((keyword) => word.toLowerCase().includes(keyword))
//     ).slice(0, 10);

//     const aiReport = {
//       ...aiReportRaw,
//       buzzwords
//     };

//     const savedReport = await ResumeReport.create({
//       user: req.user._id,
//       fileUrl: resumeUrl,
//       aiFeedback: JSON.stringify(aiReport),
//       score: aiReport.ats_score || 0,
//       resumeName, // ✅ Save filename
//     });

//     return res.status(200).json({
//       message: "Resume analyzed and saved successfully",
//       resumeUrl,
//       analysis: aiReport,
//       reportId: savedReport._id,
//       createdAt: savedReport.createdAt,
//       resumeName, // ✅ Return filename
//     });

//   } catch (err) {
//     return res.status(500).json({ error: "Resume analysis failed: " + err.message });
//   } finally {
//     if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }
// };



// ✅ Analyze Resume + Rewrite Bullet Points - POST /resume/analyze
// ✅ Analyze Resume - POST /resume/analyze

export const analyzeResume = async (req, res) => {
  const filePath = req.file?.path;
  const resumeName = req.file?.originalname || "resume.pdf";

  try {
    if (!filePath) return res.status(400).json({ error: "No file uploaded" });

    const extractedText = await extractPdfText(filePath);
    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(422).json({ error: "Text extraction failed or resume is too short" });
    }

    const resumeUrl = await uploadToCloudinary(filePath);
    const aiReportRaw = await analyzeWithOpenRouter(extractedText);

    const atsKeywords = [
      "summary", "experience", "project", "skill", "education", "certification", "award", "honor"
    ];

    const buzzwords = (aiReportRaw.buzzwords || []).filter(
      (word, index) =>
        index < 15 && !atsKeywords.some((keyword) => word.toLowerCase().includes(keyword))
    ).slice(0, 10);

    const aiReport = {
      ...aiReportRaw,
      buzzwords,
    };

    // ✨ Rewrite suggestions (only from project section)
    const lines = extractedText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const projectSectionStart = lines.findIndex((line) =>
      /projects?/i.test(line)
    );
    const projectSectionEnd = lines.findIndex(
      (line, i) => i > projectSectionStart && /^(skills?|education|experience|certifications?|awards?)/i.test(line)
    );

    const projectLines = lines.slice(
      projectSectionStart + 1,
      projectSectionEnd > -1 ? projectSectionEnd : lines.length
    );

    const bulletPointsOnly = projectLines.filter((line) => {
      const trimmed = line.trim();
      const looksLikeBullet =
        /^[\u2022\-•*]/.test(trimmed) || /^[A-Z].+\.$/.test(trimmed) || trimmed.length > 30;

      const lower = trimmed.toLowerCase();
      const skipPatterns = [
        /\b(india|panipat|haryana|email|phone|contact|linkedin|github|\d{10})\b/,
        /\bskills?\b/, /\bcss\b/, /\bhtml\b/, /\bjavascript\b/, /\breact\b/, /\bnode\b/
      ];

      return looksLikeBullet && !skipPatterns.some((p) => p.test(lower));
    });



    const rewrites = await Promise.all(
      bulletPointsOnly
        .filter((line) => {
          const lower = line.toLowerCase();
          const skipPatterns = [
            /\b(india|panipat|haryana|email|phone|contact|linkedin|github|\d{10})\b/,
            /\bskills?\b/, /\bcss\b/, /\bhtml\b/, /\bjavascript\b/, /\breact\b/, /\bnode\b/
          ];

          return (
            line.length > 10 &&
            !skipPatterns.some((p) => p.test(lower))
          );
        })
        .map(async (line) => ({
          original: line,
          rewritten: await rewriteAISuggestionWithOpenRouter(line),
        }))
    );

    const savedReport = await ResumeReport.create({
      user: req.user._id,
      fileUrl: resumeUrl,
      aiFeedback: JSON.stringify(aiReport),
      score: aiReport.ats_score || 0,
      resumeName,
      rewrites,
    });

    return res.status(200).json({
      message: "Resume analyzed and saved successfully",
      resumeUrl,
      analysis: aiReport,
      rewrites,
      reportId: savedReport._id,
      createdAt: savedReport.createdAt,
      resumeName,
    });
  } catch (err) {
    console.error("❌ Resume analysis failed:", err);
    return res.status(500).json({ error: "Resume analysis failed: " + err.message });
  } finally {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};





// ✅ Get Resume History - GET /resume/history
export const getResumeReports = async (req, res) => {
  try {
    const reports = await ResumeReport.find({ user: req.user._id }).sort({ createdAt: -1 });

    const parsedReports = reports.map((report) => ({
      resumeUrl: report.fileUrl,
      resumeName: report.resumeName || "Resume.pdf", // ✅ Include name
      analysis:
        typeof report.aiFeedback === "string"
          ? JSON.parse(report.aiFeedback)
          : report.aiFeedback,
      reportId: report._id.toString(),
      createdAt: report.createdAt,
    }));

    return res.status(200).json({ reports: parsedReports });

  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch resume reports: " + err.message,
    });
  }
};



// ✅ Delete Report - DELETE /resume/:reportId
export const deleteResumeReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const deleted = await ResumeReport.findOneAndDelete({
      _id: reportId,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Report not found or unauthorized" });
    }

    return res.status(200).json({ message: "Resume report deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to delete resume report: " + err.message,
    });
  }
};

















// // ✅ Reanalyze Existing Resume - PUT /resume/reanalyze/:reportId
// export const reanalyzeResume = async (req, res) => {
//   const { reportId } = req.params;

//   try {
//     const report = await ResumeReport.findOne({ _id: reportId, user: req.user._id });
//     if (!report) {
//       return res.status(404).json({ error: "Report not found" });
//     }

//     // 🟡 Step 1: Download file from Cloudinary
//     const tmpFile = await tmp.file({ postfix: ".pdf" });
//     const response = await axios.get(report.fileUrl, { responseType: "stream" });

//     await new Promise((resolve, reject) => {
//       const writeStream = fs.createWriteStream(tmpFile.path);
//       response.data.pipe(writeStream);
//       writeStream.on("finish", resolve);
//       writeStream.on("error", reject);
//     });

//     // 🟢 Step 2: Extract and Reanalyze
//     const extractedText = await extractPdfText(tmpFile.path);
//     if (!extractedText || extractedText.trim().length < 20) {
//       return res.status(422).json({ error: "Text extraction failed or resume is too short" });
//     }

//     const aiReport = await analyzeWithOpenRouter(extractedText);
//     if (!aiReport || typeof aiReport !== "object") {
//       return res.status(500).json({ error: "AI analysis failed" });
//     }

//     // 🟢 Step 3: Save updated report
//     report.aiFeedback = JSON.stringify(aiReport);
//     report.score = aiReport.ats_score || 0;
//     report.createdAt = new Date();
//     await report.save();

//     return res.status(200).json({
//       message: "Resume re-analyzed successfully",
//       resumeUrl: report.fileUrl,
//       resumeName: report.resumeName || "Resume.pdf", // ✅ Return name
//       analysis: aiReport,
//       reportId: report._id,
//       createdAt: report.createdAt,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "Failed to re-analyze resume: " + err.message,
//     });
//   } finally {
//     if (tmpFile?.cleanup) tmpFile.cleanup();
//   }
// };






// ✅ Reanalyze Existing Resume - PUT /resume/reanalyze/:reportId
export const reanalyzeResume = async (req, res) => {
  const { reportId } = req.params;
  let tmpFile;

  try {
    const report = await ResumeReport.findOne({ _id: reportId, user: req.user._id });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // 🟡 Step 1: Download file from Cloudinary
    tmpFile = await tmp.file({ postfix: ".pdf" });
    const response = await axios.get(report.fileUrl, { responseType: "stream" });

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(tmpFile.path);
      response.data.pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // 🟢 Step 2: Extract and Reanalyze
    const extractedText = await extractPdfText(tmpFile.path);
    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(422).json({ error: "Text extraction failed or resume is too short" });
    }

    const aiReportRaw = await analyzeWithOpenRouter(extractedText);

    const atsKeywords = [
      "summary", "experience", "project", "skill", "education", "certification", "award", "honor"
    ];

    const buzzwords = (aiReportRaw.buzzwords || []).filter(
      (word, index) =>
        index < 15 && !atsKeywords.some((keyword) => word.toLowerCase().includes(keyword))
    ).slice(0, 10);

    const aiReport = {
      ...aiReportRaw,
      buzzwords
    };

    // 🟢 Step 3: Save updated report
    report.aiFeedback = JSON.stringify(aiReport);
    report.score = aiReport.ats_score || 0;
    report.createdAt = new Date();
    await report.save();

    return res.status(200).json({
      message: "Resume re-analyzed successfully",
      resumeUrl: report.fileUrl,
      resumeName: report.resumeName || "Resume.pdf", // ✅ Return name
      analysis: aiReport,
      reportId: report._id,
      createdAt: report.createdAt,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to re-analyze resume: " + err.message,
    });
  } finally {
    try {
      tmpFile?.cleanup?.();
    } catch { }
  }
};



























// ✅ GET /resume/:reportId
export const getResumeReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await ResumeReport.findOne({
      _id: reportId,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found or unauthorized" });
    }

    return res.status(200).json({
      resumeUrl: report.fileUrl,
      resumeName: report.resumeName,
      analysis:
        typeof report.aiFeedback === "string"
          ? JSON.parse(report.aiFeedback)
          : report.aiFeedback,
      score: report.score,
      createdAt: report.createdAt,
      reportId: report._id,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch report details: " + err.message,
    });
  }
};








// Utility: Sanitize plain text
function sanitizeText(text) {
  return String(text)
    .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII chars
    .replace(/\s+/g, " ") // Normalize spacing
    .trim();
}

// ✅ GET /api/resume/download/:reportId
export const downloadResumeReportPdf = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await ResumeReport.findOne({ _id: reportId, user: req.user._id });
    if (!report) return res.status(404).json({ error: "Report not found" });

    const feedback =
      typeof report.aiFeedback === "string"
        ? JSON.parse(report.aiFeedback)
        : report.aiFeedback;

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${(report.resumeName || "resume-report").replace(/ /g, "_")}.pdf"`
    );

    doc.pipe(res);

    // --- Header
    doc.fontSize(22).font("Helvetica-Bold").text("AI Resume Analysis Report", {
      align: "center",
    });
    doc.moveDown(1.5);

    // --- Metadata
    doc.fontSize(12).font("Helvetica");
    doc.text(`Resume Name: ${sanitizeText(report.resumeName || "Unnamed Resume")}`);
    doc.text(`Uploaded: ${new Date(report.createdAt).toLocaleString()}`);
    doc.text(`ATS Score: ${report.score}%`);
    doc.moveDown();

    // --- Verdict Summary
    if (feedback.verdict_summary) {
      doc.fontSize(14).font("Helvetica-Bold").text("Verdict Summary");
      doc.fontSize(12).font("Helvetica").text(sanitizeText(feedback.verdict_summary)).moveDown();
    }

    // --- Section Definitions
    const sections = [
      { label: "Suggestions", key: "suggestions" },
      { label: "Buzzwords", key: "buzzwords" },
      { label: "Repeated Phrases", key: "repeated_phrases" },
      { label: "Missing Sections", key: "missing_sections" },
      { label: "Action Verbs", key: "action_verbs" },
      { label: "Tone Analysis", key: "tone_analysis" },
    ];

    sections.forEach(({ label, key }) => {
      const value = feedback[key];
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        doc.fontSize(14).font("Helvetica-Bold").text(label);
        doc.moveDown(0.5);

        if (Array.isArray(value)) {
          value.forEach((item, idx) =>
            doc.fontSize(12).font("Helvetica").text(`${idx + 1}. ${sanitizeText(item)}`)
          );
        } else {
          doc.fontSize(12).font("Helvetica").text(sanitizeText(value));
        }

        doc.moveDown();
      }
    });

    // --- Footer
    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Generated by Resume IQ – AI Resume Analyzer", {
        align: "center",
      })


    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};




export const rewriteAISuggestion = async (req, res) => {
  const { text } = req.body;
  const { reportId } = req.params;

  if (!text || text.trim().length < 5) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const rewritten = await rewriteAISuggestionWithOpenRouter(text);

    const report = await ResumeReport.findOne({ _id: reportId, user: req.user._id });
    if (!report) return res.status(404).json({ error: "Report not found" });

    report.rewrites = report.rewrites || [];
    report.rewrites.push({ original: text, rewritten });
    await report.save();

    return res.status(200).json({ rewritten });
  } catch (err) {
    console.error("Rewrite error:", err.message);
    return res.status(500).json({ error: "AI rewrite failed" });
  }
};
