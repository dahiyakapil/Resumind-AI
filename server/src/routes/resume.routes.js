// import express from "express";
// import upload from "../middlewares/upload.js";
// import { analyzeResume, getResumeReports } from "../controllers/resume.controller.js";
// import { userAuth } from "../middlewares/auth.middleware.js";


// const resumeReportRouter = express.Router();
// resumeReportRouter.post("/analyze", userAuth, upload.single("resume"), analyzeResume);

// resumeReportRouter.get("/history", userAuth, getResumeReports);


// export default resumeReportRouter;




import express from "express";
import { upload } from "../middlewares/upload.js";
import {
    analyzeResume,
    deleteResumeReport,
    downloadResumeReportPdf,
    getResumeReportById,
    getResumeReports,
    reanalyzeResume,
    rewriteAISuggestion
}
from "../controllers/resume.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";
import { generateUpdatedPdfWithRewrites } from "../controllers/generateUpdatedPdfWithRewrites.controller.js";



const resumeRouter = express.Router();

// @route   POST /api/resume/analyze
// @desc    Upload and analyze resume (PDF)
// @access  Private
resumeRouter.post("/analyze", userAuth, upload.single("resume"), analyzeResume);

// @route   GET /api/resume/history
// @desc    Get resume analysis history
// @access  Private
resumeRouter.get("/history", userAuth, getResumeReports);


// @route   DELETE /resume/:reportId
resumeRouter.delete("/:reportId", userAuth, deleteResumeReport);

resumeRouter.put("/reanalyze/:reportId", userAuth, reanalyzeResume);


// @route   GET /api/resume/:reportId
// @desc    Get a single resume report
// @access  Private
resumeRouter.get("/:reportId", userAuth, getResumeReportById);


// @route   GET /api/resume/download/:reportId
// @desc    Download resume analysis report as PDF
// @access  Private
resumeRouter.get("/download/:reportId", userAuth, downloadResumeReportPdf);


// POST /rewrite-suggestions
resumeRouter.post("/rewrite/:reportId", userAuth, rewriteAISuggestion);




// POST /resume/download-updated/:reportId
resumeRouter.post("/download-updated/:reportId", userAuth, generateUpdatedPdfWithRewrites);




export default resumeRouter;
