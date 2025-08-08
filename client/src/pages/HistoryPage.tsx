// // src/pages/HistoryPage.tsx
// import React from "react";
// import { useAppSelector } from "@/hooks/redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";
// import { FileText, GaugeIcon } from "lucide-react";

// const HistoryPage = () => {
//   const history = useAppSelector((s) => s.resumeAnalysis.history);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">📂 Resume History</h2>

//       {history.length === 0 ? (
//         <p className="text-muted-foreground">No history found. Upload a resume to get started.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((report) => (
//             <div
//               key={report.reportId}
//               className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
//             >
//               <CardHeader className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="text-xl flex items-center gap-2 text-white">
//                     <FileText className="w-5 h-5 text-blue-400" />
//                     Resume Report
//                   </CardTitle>
//                   <Badge variant="secondary" className="text-xs">
//                     {formatRelativeDate((report as any).createdAt || new Date().toISOString())}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formatReadableDate((report as any).createdAt || new Date().toISOString())}
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>ATS Score:</span>
//                   <span className="text-green-400 font-bold text-lg">
//                     {report.analysis.ats_score}%
//                   </span>
//                   <GaugeIcon className="text-green-400 w-4 h-4" />
//                 </div>

//                 <a
//                   href={report.resumeUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="underline text-blue-400 hover:text-blue-500 text-sm"
//                 >
//                   View Uploaded Resume PDF
//                 </a>

//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">Verdict Summary:</p>
//                   <p className="text-white">{report.analysis.verdict_summary}</p>
//                 </div>
//               </CardContent>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;

// // --- src/pages/HistoryPage.tsx ---
// import { useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";
// import { FileText, GaugeIcon, Trash2, Eye, RotateCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchResumeHistory,
//   deleteResumeReport,
// } from "@/features/resumeAnalysis/resumeAnalysisSlice";
// import type { AnalysisResponse } from "@/types/resumeAnalysis";

// const HistoryPage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { history, loading, error } = useAppSelector((s) => s.resumeAnalysis);

//   useEffect(() => {
//     dispatch(fetchResumeHistory());
//   }, [dispatch]);

//   const handleReScore = () => {
//     navigate("/dashboard");
//   };

//   const handleDelete = (reportId: string) => {
//     dispatch(deleteResumeReport(reportId));
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">📂 Resume History</h2>

//       {loading && <p className="text-muted-foreground">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {history.length === 0 && !loading ? (
//         <p className="text-muted-foreground">No history found. Upload a resume to get started.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((report: AnalysisResponse & { createdAt?: string }, index) => (
//             <div
//               key={report.reportId ?? `resume-${index}`}
//               className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
//             >
//               <CardHeader className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="text-xl flex items-center gap-2 text-white">
//                     <FileText className="w-5 h-5 text-blue-400" /> Resume Report
//                   </CardTitle>
//                   <Badge variant="secondary" className="text-xs">
//                     {formatRelativeDate(report.createdAt ?? new Date().toISOString())}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formatReadableDate(report.createdAt ?? new Date().toISOString())}
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>ATS Score:</span>
//                   <span className="text-green-400 font-bold text-lg">
//                     {report.analysis?.ats_score ?? "N/A"}%
//                   </span>
//                   <GaugeIcon className="text-green-400 w-4 h-4" />
//                 </div>

//                 <div className="flex gap-3 items-center flex-wrap">
//                   <Button
//                     variant="outline"
//                     className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white"
//                     onClick={() => window.open(report.resumeUrl, "_blank")}
//                   >
//                     <Eye className="w-4 h-4 mr-2" /> View Resume
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-white"
//                     onClick={handleReScore}
//                   >
//                     <RotateCcw className="w-4 h-4 mr-2" /> Re-Score
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
//                     onClick={() => handleDelete(report.reportId)}
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete
//                   </Button>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">
//                     Verdict Summary:
//                   </p>
//                   <p className="text-white whitespace-pre-wrap">
//                     {report.analysis?.verdict_summary ?? "No summary available"}
//                   </p>
//                 </div>
//               </CardContent>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;

// import { useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";
// import { FileText, GaugeIcon, Trash2, Eye, RotateCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchResumeHistory,
//   deleteResumeReport,
// } from "@/features/resumeAnalysis/resumeAnalysisSlice";

// const HistoryPage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { history, loading, error } = useAppSelector((s) => s.resumeAnalysis);

//   useEffect(() => {
//     dispatch(fetchResumeHistory());
//   }, [dispatch]);

//   const handleReScore = () => navigate("/dashboard");
//   const handleDelete = (reportId: string) => dispatch(deleteResumeReport(reportId));

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">📂 Resume History</h2>

//       {loading && <p className="text-muted-foreground">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {history.length === 0 && !loading ? (
//         <p className="text-muted-foreground">No history found. Upload a resume to get started.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((report) => (
//             <div
//               key={report.reportId}
//               className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
//             >
//               <CardHeader className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="text-xl flex items-center gap-2 text-white">
//                     <FileText className="w-5 h-5 text-blue-400" /> Resume Report
//                   </CardTitle>
//                   <Badge variant="secondary" className="text-xs">
//                     {formatRelativeDate(report.createdAt)}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formatReadableDate(report.createdAt)}
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>ATS Score:</span>
//                   <span className="text-green-400 font-bold text-lg">
//                     {report.analysis?.ats_score ?? "N/A"}%
//                   </span>
//                   <GaugeIcon className="text-green-400 w-4 h-4" />
//                 </div>

//                 <div className="flex gap-3 items-center flex-wrap">
//                   <Button
//                     variant="outline"
//                     className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white"
//                     onClick={() => window.open(report.resumeUrl, "_blank")}
//                   >
//                     <Eye className="w-4 h-4 mr-2" /> View Resume
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-white"
//                     onClick={handleReScore}
//                   >
//                     <RotateCcw className="w-4 h-4 mr-2" /> Re-Score
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
//                     onClick={() => handleDelete(report.reportId)}
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete
//                   </Button>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground mb-1">
//                     Verdict Summary:
//                   </p>
//                   <p className="text-white whitespace-pre-wrap">
//                     {report.analysis?.verdict_summary ?? "No summary available"}
//                   </p>
//                 </div>
//               </CardContent>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;

// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";
// import {
//   FileText,
//   GaugeIcon,
//   Trash2,
//   Eye,
//   RotateCcw,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchResumeHistory,
//   deleteResumeReport,
//   reanalyzeResume,
// } from "@/features/resumeAnalysis/resumeAnalysisSlice";

// const HistoryPage = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { history, loading, error } = useAppSelector((s) => s.resumeAnalysis);
//   const [expanded, setExpanded] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(fetchResumeHistory());
//   }, [dispatch]);

//   const handleReScore = (reportId: string) => {
//     dispatch(reanalyzeResume(reportId));
//   };
//   const handleDelete = (reportId: string) =>
//     dispatch(deleteResumeReport(reportId));

//   const toggleExpand = (reportId: string) => {
//     setExpanded((prev) => (prev === reportId ? null : reportId));
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">📂 Resume History</h2>

//       {loading && <p className="text-muted-foreground">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {history.length === 0 && !loading ? (
//         <p className="text-muted-foreground">
//           No history found. Upload a resume to get started.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((report) => (
//             <div
//               key={report.reportId}
//               className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
//             >
//               <CardHeader className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="text-xl flex items-center gap-2 text-white">
//                     <FileText className="w-5 h-5 text-blue-400" /> Resume Report
//                   </CardTitle>
//                   <Badge variant="secondary" className="text-xs">
//                     {formatRelativeDate(report.createdAt)}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formatReadableDate(report.createdAt)}
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>ATS Score:</span>
//                   <span className="text-green-400 font-bold text-lg">
//                     {report.analysis?.ats_score ?? "N/A"}%
//                   </span>
//                   <GaugeIcon className="text-green-400 w-4 h-4" />
//                 </div>

//                 <div className="flex gap-3 items-center flex-wrap">
//                   <Button
//                     variant="outline"
//                     className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white"
//                     onClick={() => window.open(report.resumeUrl, "_blank")}
//                   >
//                     <Eye className="w-4 h-4 mr-2" /> View Resume
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-white"
//                     onClick={() => handleReScore(report.reportId)}
//                   >
//                     <RotateCcw className="w-4 h-4 mr-2" /> Re-Score
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
//                     onClick={() => handleDelete(report.reportId)}
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete
//                   </Button>

//                   <Button
//                     variant="ghost"
//                     onClick={() => toggleExpand(report.reportId)}
//                     className="text-white"
//                   >
//                     {expanded === report.reportId ? (
//                       <>
//                         Hide Details <ChevronUp className="ml-1 w-4 h-4" />
//                       </>
//                     ) : (
//                       <>
//                         Show Details <ChevronDown className="ml-1 w-4 h-4" />
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {expanded === report.reportId && (
//                   <div className="space-y-3 text-sm text-white">
//                     <p>
//                       <strong>Verdict:</strong>{" "}
//                       {report.analysis?.verdict_summary ?? "N/A"}
//                     </p>
//                     <p>
//                       <strong>Tone:</strong>{" "}
//                       {report.analysis?.tone_analysis ?? "N/A"}
//                     </p>
//                     <p>
//                       <strong>Suggestions:</strong>{" "}
//                       {report.analysis?.suggestions?.join("; ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Buzzwords:</strong>{" "}
//                       {report.analysis?.buzzwords?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Repeated Phrases:</strong>{" "}
//                       {report.analysis?.repeated_phrases?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Action Verbs:</strong>{" "}
//                       {report.analysis?.action_verbs?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Missing Sections:</strong>{" "}
//                       {report.analysis?.missing_sections?.join(", ") || "None"}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;

// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";
// import {
//   FileText,
//   GaugeIcon,
//   Trash2,
//   Eye,
//   RotateCcw,
//   ChevronDown,
//   ChevronUp,
//   Loader2,
// } from "lucide-react";
// import {
//   fetchResumeHistory,
//   deleteResumeReport,
//   reanalyzeResume,
// } from "@/features/resumeAnalysis/resumeAnalysisSlice";
// import { toast } from "sonner";

// const HistoryPage = () => {
//   const dispatch = useAppDispatch();
//   const { history, loading, error } = useAppSelector((s) => s.resumeAnalysis);

//   const [expanded, setExpanded] = useState<string | null>(null);
//   const [reAnalyzingId, setReAnalyzingId] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(fetchResumeHistory());
//   }, [dispatch]);

//   // const handleReScore = async (reportId: string) => {
//   //   setReAnalyzingId(reportId);
//   //   toast.loading("Re-analyzing resume...");

//   //   try {
//   //     await dispatch(reanalyzeResume(reportId)).unwrap();
//   //     toast.success("Resume re-analyzed successfully!");
//   //   } catch (err: unknown) {
//   //     if (err instanceof Error) {
//   //       toast.error(err.message);
//   //     } else {
//   //       toast.error("Failed to re-analyze resume");
//   //     }
//   //   } finally {
//   //     setReAnalyzingId(null);
//   //   }
//   // };

// const handleReScore = async (reportId: string) => {
//   setReAnalyzingId(reportId);
//   const toastId = toast.loading("Re-analyzing resume...");

//   try {
//     await dispatch(reanalyzeResume(reportId)).unwrap();
//     toast.dismiss(toastId);
//     toast.success("✅ Resume re-analyzed successfully!");
//   } catch (err: unknown) {
//     toast.dismiss(toastId);

//     if (err instanceof Error) {
//       toast.error(`❌ ${err.message}`);
//     } else {
//       toast.error("❌ Failed to re-analyze resume");
//     }
//   } finally {
//     setReAnalyzingId(null);
//   }
// };

//   const handleDelete = (reportId: string) =>
//     dispatch(deleteResumeReport(reportId));

//   const toggleExpand = (reportId: string) => {
//     setExpanded((prev) => (prev === reportId ? null : reportId));
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">📂 Resume History</h2>

//       {loading && <p className="text-muted-foreground">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {history.length === 0 && !loading ? (
//         <p className="text-muted-foreground">
//           No history found. Upload a resume to get started.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {history.map((report) => (
//             <div
//               key={report.reportId}
//               className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-[#1f2937] to-[#111827] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
//             >
//               <CardHeader className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <CardTitle className="text-xl flex items-center gap-2 text-white">
//                     <FileText className="w-5 h-5 text-blue-400" /> Resume Report
//                   </CardTitle>
//                   <Badge variant="secondary" className="text-xs">
//                     {formatRelativeDate(report.createdAt)}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   {formatReadableDate(report.createdAt)}
//                 </p>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <span>ATS Score:</span>
//                   <span className="text-green-400 font-bold text-lg">
//                     {report.analysis?.ats_score ?? "N/A"}%
//                   </span>
//                   <GaugeIcon className="text-green-400 w-4 h-4" />
//                 </div>

//                 <div className="flex gap-3 items-center flex-wrap">
//                   <Button
//                     variant="outline"
//                     className="text-blue-400 border-blue-400 hover:bg-blue-500 hover:text-white"
//                     onClick={() => window.open(report.resumeUrl, "_blank")}
//                   >
//                     <Eye className="w-4 h-4 mr-2" /> View Resume
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-white"
//                     onClick={() => handleReScore(report.reportId)}
//                     disabled={reAnalyzingId === report.reportId}
//                   >
//                     {reAnalyzingId === report.reportId ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Re-scoring...
//                       </>
//                     ) : (
//                       <>
//                         <RotateCcw className="w-4 h-4 mr-2" />
//                         Re-Score
//                       </>
//                     )}
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
//                     onClick={() => handleDelete(report.reportId)}
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete
//                   </Button>

//                   <Button
//                     variant="ghost"
//                     onClick={() => toggleExpand(report.reportId)}
//                     className="text-white"
//                   >
//                     {expanded === report.reportId ? (
//                       <>
//                         Hide Details <ChevronUp className="ml-1 w-4 h-4" />
//                       </>
//                     ) : (
//                       <>
//                         Show Details <ChevronDown className="ml-1 w-4 h-4" />
//                       </>
//                     )}
//                   </Button>
//                 </div>

//                 {expanded === report.reportId && (
//                   <div className="space-y-3 text-sm text-white">
//                     <p>
//                       <strong>Verdict:</strong>{" "}
//                       {report.analysis?.verdict_summary ?? "N/A"}
//                     </p>
//                     <p>
//                       <strong>Tone:</strong>{" "}
//                       {report.analysis?.tone_analysis ?? "N/A"}
//                     </p>
//                     <p>
//                       <strong>Suggestions:</strong>{" "}
//                       {report.analysis?.suggestions?.join("; ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Buzzwords:</strong>{" "}
//                       {report.analysis?.buzzwords?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Repeated Phrases:</strong>{" "}
//                       {report.analysis?.repeated_phrases?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Action Verbs:</strong>{" "}
//                       {report.analysis?.action_verbs?.join(", ") || "None"}
//                     </p>
//                     <p>
//                       <strong>Missing Sections:</strong>{" "}
//                       {report.analysis?.missing_sections?.join(", ") || "None"}
//                     </p>
//                   </div>
//                 )}
//               </CardContent>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;

import {
  FileText,
  GaugeIcon,
  Trash2,
  Eye,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Loader2,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";

import {
  fetchResumeHistory,
  deleteResumeReport,
  reanalyzeResume,
  downloadReportPdf,
} from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { formatReadableDate, formatRelativeDate } from "@/utils/formatDate";

const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { history, loading, error } = useAppSelector((s) => s.resumeAnalysis);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [reAnalyzingId, setReAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchResumeHistory());
  }, [dispatch]);

  const handleReScore = async (reportId: string) => {
    setReAnalyzingId(reportId);
    const toastId = toast.loading("Re-analyzing resume...");
    try {
      await dispatch(reanalyzeResume(reportId)).unwrap();
      toast.success("✅ Resume re-analyzed successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(`❌ ${err.message}`);
      else toast.error("❌ Failed to re-analyze resume");
    } finally {
      toast.dismiss(toastId);
      setReAnalyzingId(null);
    }
  };

  const handleDelete = (reportId: string) =>
    dispatch(deleteResumeReport(reportId));

  const toggleExpand = (reportId: string) => {
    setExpanded((prev) => (prev === reportId ? null : reportId));
  };

  const handleDownload = async (reportId: string) => {
    const toastId = toast.loading("Preparing your PDF...");
    try {
      await dispatch(downloadReportPdf(reportId)).unwrap();
      toast.success("✅ Report downloaded!");
    } catch (err) {
      toast.error("❌ Failed to download PDF");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">📂 Resume History</h2>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {history.length === 0 && !loading ? (
        <p className="text-muted-foreground">
          No history found. Upload a resume to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {history.map((report) => (
            <div
              key={report.reportId}
              className="rounded-2xl border shadow-xl transition-all duration-300 p-4
                bg-muted/50 backdrop-blur-sm dark:bg-[#111827] border-border"
            >
              <CardHeader className="space-y-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <FileText className="w-5 h-5 text-primary" /> Resume Report
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {formatRelativeDate(report.createdAt)}
                  </Badge>
                </div>
                {/* ✅ Resume Name */}
                {report.resumeName && (
                  <p className="text-sm font-medium text-muted-foreground truncate">
                    📄 {report.resumeName}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {formatReadableDate(report.createdAt)}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>ATS Score:</span>
                  <span className="text-green-600 font-bold text-lg dark:text-green-400">
                    {report.analysis?.ats_score ?? "N/A"}%
                  </span>
                  <GaugeIcon className="text-green-600 dark:text-green-400 w-4 h-4" />
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => window.open(report.resumeUrl, "_blank")}
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Resume
                  </Button>

                  <Button
                    variant="outline"
                    className="text-yellow-600 border-yellow-600 hover:bg-yellow-500 hover:text-white"
                    onClick={() => handleReScore(report.reportId)}
                    disabled={reAnalyzingId === report.reportId}
                  >
                    {reAnalyzingId === report.reportId ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Re-scoring...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Re-Score
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
                    onClick={() => handleDownload(report.reportId)}
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Report
                  </Button>

                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(report.reportId)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => toggleExpand(report.reportId)}
                    className="text-primary hover:underline"
                  >
                    {expanded === report.reportId ? (
                      <>
                        Hide Details <ChevronUp className="ml-1 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show Details <ChevronDown className="ml-1 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                {expanded === report.reportId && (
                  <div className="space-y-3 text-sm text-foreground">
                    <p>
                      <strong>Verdict:</strong>{" "}
                      {report.analysis?.verdict_summary ?? "N/A"}
                    </p>
                    <p>
                      <strong>Tone:</strong>{" "}
                      {report.analysis?.tone_analysis ?? "N/A"}
                    </p>
                    <p>
                      <strong>Suggestions:</strong>{" "}
                      {report.analysis?.suggestions?.join("; ") || "None"}
                    </p>
                    <p>
                      <strong>Buzzwords:</strong>{" "}
                      {report.analysis?.buzzwords?.join(", ") || "None"}
                    </p>
                    <p>
                      <strong>Repeated Phrases:</strong>{" "}
                      {report.analysis?.repeated_phrases?.join(", ") || "None"}
                    </p>
                    <p>
                      <strong>Action Verbs:</strong>{" "}
                      {report.analysis?.action_verbs?.join(", ") || "None"}
                    </p>
                    <p>
                      <strong>Missing Sections:</strong>{" "}
                      {report.analysis?.missing_sections?.join(", ") || "None"}
                    </p>
                  </div>
                )}
              </CardContent>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
