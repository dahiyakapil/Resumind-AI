// import mongoose from "mongoose";

// const resumeReportSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   fileUrl: {
//     type: String,
//     required: true,
//   },
//   aiFeedback: {
//     type: String,
//     required: true,
//   },
//   score: {
//     type: Number,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const ResumeReport = mongoose.model("ResumeReport", resumeReportSchema);
// export default ResumeReport;


import mongoose from "mongoose";

const resumeReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  aiFeedback: {
    type: mongoose.Schema.Types.Mixed, // ← store as object
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  resumeName: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rewrites: [
  {
    original: String,
    rewritten: String,
    createdAt: { type: Date, default: Date.now },
  },
],
});

const ResumeReport = mongoose.model("ResumeReport", resumeReportSchema);
export default ResumeReport;

