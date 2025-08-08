// import React from "react";
// import { useAppSelector } from "@/hooks/redux";

// const AnalysisHistory: React.FC = () => {
//   const { history, data } = useAppSelector((s) => s.resumeAnalysis);

//   return (
//     <div className="space-y-4">
//       <div className="text-xl font-semibold flex items-center gap-2">
//         <span>🕘</span> Analysis History
//       </div>
//       {history.map((h) => (
//         <div
//           key={h.reportId}
//           className={`border rounded-xl p-4 flex justify-between items-center ${
//             data?.reportId === h.reportId ? "ring-2 ring-blue-500" : "bg-slate-900"
//           }`}
//         >
//           <div className="flex items-center gap-4">
//             <div className="text-lg">📄</div>
//             <div>
//               <div className="font-semibold">{`Resume`}</div>
//               <div className="text-xs text-slate-400">{`Report ID: ${h.reportId}`}</div>
//             </div>
//           </div>
//           <div className="flex gap-6 text-sm">
//             <div>Suggestions: {h.analysis.suggestions.length}</div>
//             <div>Buzzwords: {h.analysis.buzzwords.length}</div>
//             <div>Missing: {h.analysis.missing_sections.length}</div>
//             <div>Tone: {h.analysis.tone_analysis.split(",")[0]}</div>
//           </div>
//           <div>
//             <div className="px-4 py-2 bg-blue-500 text-white rounded-full">Current</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AnalysisHistory;

// import React, { useState } from "react";
// import { useAppSelector } from "@/hooks/redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Clock, ChevronDown, ChevronUp } from "lucide-react";
// import { motion } from "framer-motion";

// const AnalysisHistory: React.FC = () => {
//   const { history, data } = useAppSelector((s) => s.resumeAnalysis);
//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   const toggleExpanded = (reportId: string) => {
//     setExpandedId((prev) => (prev === reportId ? null : reportId));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2 text-2xl font-bold text-white">
//         <Clock className="w-6 h-6 text-yellow-400" />
//         Resume Analysis History
//       </div>

//       {history.length === 0 ? (
//         <Skeleton className="h-24 w-full rounded-xl" />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {history.map((h, index) => {
//             const isExpanded = expandedId === h.reportId;
//             return (
//               <motion.div
//                 key={h.reportId}
//                 initial={{ opacity: 0, translateY: 30 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   className={`rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700 shadow-xl transition-all duration-300 h-full ${
//                     data?.reportId === h.reportId ? "ring-2 ring-blue-500" : ""
//                   }`}
//                 >
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-white text-lg truncate">
//                       Resume Report
//                     </CardTitle>
//                     <p className="text-xs text-slate-400 break-all truncate">
//                       ID: {h.reportId}
//                     </p>
//                   </CardHeader>

//                   <CardContent className="text-white text-sm space-y-4">
//                     {h.analysis ? (
//                       <>
//                         <div className="flex flex-wrap gap-2">
//                           <Badge variant="secondary" className="bg-blue-600 text-white">
//                             ATS Score: {h.analysis.ats_score}%
//                           </Badge>
//                           <Badge className="bg-yellow-600 text-white">
//                             Suggestions: {h.analysis.suggestions.length}
//                           </Badge>
//                           <Badge className="bg-purple-600 text-white">
//                             Buzzwords: {h.analysis.buzzwords.length}
//                           </Badge>
//                           <Badge className="bg-pink-600 text-white">
//                             Missing: {h.analysis.missing_sections.length}
//                           </Badge>
//                         </div>

//                         <div
//                           className={`space-y-1 text-slate-300 transition-all duration-300 ease-in-out ${
//                             isExpanded ? "" : "line-clamp-5"
//                           }`}
//                         >
//                           <p>
//                             <span className="font-medium text-slate-400">Tone:</span>{" "}
//                             {h.analysis.tone_analysis || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Verdict:</span>{" "}
//                             {h.analysis.verdict_summary || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Suggestions:</span>{" "}
//                             {h.analysis.suggestions?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Buzzwords:</span>{" "}
//                             {h.analysis.buzzwords?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Repeated Phrases:</span>{" "}
//                             {h.analysis.repeated_phrases?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Action Verbs:</span>{" "}
//                             {h.analysis.action_verbs?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Missing Sections:</span>{" "}
//                             {h.analysis.missing_sections?.join(", ") || "None"}
//                           </p>
//                         </div>

//                         <div className="pt-2">
//                           <Button
//                             variant="ghost"
//                             className="text-blue-400 hover:text-white flex items-center"
//                             onClick={() => toggleExpanded(h.reportId)}
//                           >
//                             {isExpanded ? (
//                               <>
//                                 Show Less <ChevronUp className="ml-1 w-4 h-4" />
//                               </>
//                             ) : (
//                               <>
//                                 Show More <ChevronDown className="ml-1 w-4 h-4" />
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-red-400">No analysis data available.</div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisHistory;

// import React, { useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { deleteResumeReport } from "@/features/resumeAnalysis/resumeAnalysisSlice";
// import { toast } from "sonner";

// const AnalysisHistory: React.FC = () => {
//   const { history, data } = useAppSelector((s) => s.resumeAnalysis);
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const dispatch = useAppDispatch();

//   const toggleExpanded = (reportId: string) => {
//     setExpandedId((prev) => (prev === reportId ? null : reportId));
//   };

//   const handleDelete = (reportId: string) => {
//     dispatch(deleteResumeReport(reportId));
//     toast.success("Resume report deleted.");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2 text-2xl font-bold text-white">
//         <Clock className="w-6 h-6 text-yellow-400" />
//         Resume Analysis History
//       </div>

//       {history.length === 0 ? (
//         <Skeleton className="h-24 w-full rounded-xl" />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {history.map((h, index) => {
//             const isExpanded = expandedId === h.reportId;

//             return (
//               <motion.div
//                 key={h.reportId}
//                 initial={{ opacity: 0, translateY: 30 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   className={`rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700 shadow-xl transition-all duration-300 h-full ${
//                     data?.reportId === h.reportId ? "ring-2 ring-blue-500" : ""
//                   }`}
//                 >
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-white text-lg truncate">
//                       {h.resumeName || "Unnamed Resume"}
//                     </CardTitle>
//                     <p className="text-xs text-slate-400 break-all truncate">
//                       ID: {h.reportId}
//                     </p>
//                   </CardHeader>

//                   <CardContent className="text-white text-sm space-y-4">
//                     {h.analysis ? (
//                       <>
//                         <div className="flex flex-wrap gap-2">
//                           <Badge variant="secondary" className="bg-blue-600 text-white">
//                             ATS Score: {h.analysis.ats_score}%
//                           </Badge>
//                           <Badge className="bg-yellow-600 text-white">
//                             Suggestions: {h.analysis.suggestions.length}
//                           </Badge>
//                           <Badge className="bg-purple-600 text-white">
//                             Buzzwords: {h.analysis.buzzwords.length}
//                           </Badge>
//                           <Badge className="bg-pink-600 text-white">
//                             Missing: {h.analysis.missing_sections.length}
//                           </Badge>
//                         </div>

//                         <div
//                           className={`space-y-1 text-slate-300 transition-all duration-300 ease-in-out ${
//                             isExpanded ? "" : "line-clamp-5"
//                           }`}
//                         >
//                           <p>
//                             <span className="font-medium text-slate-400">Tone:</span>{" "}
//                             {h.analysis.tone_analysis || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Verdict:</span>{" "}
//                             {h.analysis.verdict_summary || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Suggestions:</span>{" "}
//                             {h.analysis.suggestions?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Buzzwords:</span>{" "}
//                             {h.analysis.buzzwords?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Repeated Phrases:</span>{" "}
//                             {h.analysis.repeated_phrases?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Action Verbs:</span>{" "}
//                             {h.analysis.action_verbs?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-medium text-slate-400">Missing Sections:</span>{" "}
//                             {h.analysis.missing_sections?.join(", ") || "None"}
//                           </p>
//                         </div>

//                         <div className="pt-3 flex justify-between items-center">
//                           <Button
//                             variant="ghost"
//                             className="text-blue-400 hover:text-white flex items-center"
//                             onClick={() => toggleExpanded(h.reportId)}
//                           >
//                             {isExpanded ? (
//                               <>
//                                 Show Less <ChevronUp className="ml-1 w-4 h-4" />
//                               </>
//                             ) : (
//                               <>
//                                 Show More <ChevronDown className="ml-1 w-4 h-4" />
//                               </>
//                             )}
//                           </Button>

//                           <Button
//                             variant="outline"
//                             className="text-red-400 border-red-400 hover:bg-red-500 hover:text-white"
//                             size="sm"
//                             onClick={() => handleDelete(h.reportId)}
//                           >
//                             <Trash2 className="w-4 h-4 mr-1" />
//                             Delete
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-red-400">No analysis data available.</div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisHistory;

// import React, { useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { deleteResumeReport } from "@/features/resumeAnalysis/resumeAnalysisSlice";
// import { toast } from "sonner";

// const AnalysisHistory: React.FC = () => {
//   const { history, data } = useAppSelector((s) => s.resumeAnalysis);
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const dispatch = useAppDispatch();

//   const toggleExpanded = (reportId: string) => {
//     setExpandedId((prev) => (prev === reportId ? null : reportId));
//   };

//   const handleDelete = (reportId: string) => {
//     dispatch(deleteResumeReport(reportId));
//     toast.success("Resume report deleted.");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
//         <Clock className="w-6 h-6 text-yellow-500" />
//         Resume Analysis History
//       </div>

//       {history.length === 0 ? (
//         <Skeleton className="h-24 w-full rounded-xl" />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {history.map((h, index) => {
//             const isExpanded = expandedId === h.reportId;

//             return (
//               <motion.div
//                 key={h.reportId}
//                 initial={{ opacity: 0, translateY: 30 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   className={`rounded-2xl border shadow-lg h-full transition-all duration-300 ${
//                     data?.reportId === h.reportId
//                       ? "ring-2 ring-blue-500"
//                       : ""
//                   }`}
//                 >
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-base font-semibold text-foreground truncate">
//                       {h.resumeName || "Unnamed Resume"}
//                     </CardTitle>
//                     <p className="text-xs text-muted-foreground break-all truncate">
//                       ID: {h.reportId}
//                     </p>
//                   </CardHeader>

//                   <CardContent className="text-sm text-muted-foreground space-y-4">
//                     {h.analysis ? (
//                       <>
//                         <div className="flex flex-wrap gap-2">
//                           <Badge variant="secondary">
//                             ATS Score: {h.analysis.ats_score}%
//                           </Badge>
//                           <Badge variant="outline">
//                             Suggestions: {h.analysis.suggestions.length}
//                           </Badge>
//                           <Badge variant="outline">
//                             Buzzwords: {h.analysis.buzzwords.length}
//                           </Badge>
//                           <Badge variant="outline">
//                             Missing: {h.analysis.missing_sections.length}
//                           </Badge>
//                         </div>

//                         <div
//                           className={`space-y-1 transition-all duration-300 ease-in-out ${
//                             isExpanded ? "" : "line-clamp-5"
//                           }`}
//                         >
//                           <p>
//                             <span className="font-semibold">Tone:</span>{" "}
//                             {h.analysis.tone_analysis || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Verdict:</span>{" "}
//                             {h.analysis.verdict_summary || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Suggestions:</span>{" "}
//                             {h.analysis.suggestions?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Buzzwords:</span>{" "}
//                             {h.analysis.buzzwords?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Repeated Phrases:</span>{" "}
//                             {h.analysis.repeated_phrases?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Action Verbs:</span>{" "}
//                             {h.analysis.action_verbs?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Missing Sections:</span>{" "}
//                             {h.analysis.missing_sections?.join(", ") || "None"}
//                           </p>
//                         </div>

//                         <div className="pt-3 flex justify-between items-center">
//                           <Button
//                             variant="ghost"
//                             className="text-blue-600 hover:underline"
//                             onClick={() => toggleExpanded(h.reportId)}
//                           >
//                             {isExpanded ? (
//                               <>
//                                 Show Less <ChevronUp className="ml-1 w-4 h-4" />
//                               </>
//                             ) : (
//                               <>
//                                 Show More <ChevronDown className="ml-1 w-4 h-4" />
//                               </>
//                             )}
//                           </Button>

//                           <Button
//                             variant="outline"
//                             className="text-destructive border-destructive hover:bg-destructive hover:text-white"
//                             size="sm"
//                             onClick={() => handleDelete(h.reportId)}
//                           >
//                             <Trash2 className="w-4 h-4 mr-1" />
//                             Delete
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-red-500">No analysis data available.</div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisHistory;





















// import React, { useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/hooks/redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Clock, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { deleteResumeReport } from "@/features/resumeAnalysis/resumeAnalysisSlice";
// import { toast } from "sonner";

// const AnalysisHistory: React.FC = () => {
//   const { history, data } = useAppSelector((s) => s.resumeAnalysis);
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const dispatch = useAppDispatch();

//   const toggleExpanded = (reportId: string) => {
//     setExpandedId((prev) => (prev === reportId ? null : reportId));
//   };

//   const handleDelete = (reportId: string) => {
//     dispatch(deleteResumeReport(reportId));
//     toast.success("Resume report deleted.");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
//         <Clock className="w-6 h-6 text-yellow-500" />
//         Resume Analysis History
//       </div>

//       {history.length === 0 ? (
//         <Skeleton className="h-24 w-full rounded-xl" />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {history.map((h, index) => {
//             const isExpanded = expandedId === h.reportId;

//             return (
//               <motion.div
//                 key={h.reportId}
//                 initial={{ opacity: 0, translateY: 30 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   className={`
//                     h-full transition-all duration-300 border border-border shadow-md rounded-2xl
//                     bg-gradient-to-br 
//                     from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 
//                     hover:shadow-lg
//                     ${
//                       data?.reportId === h.reportId
//                         ? "ring-2 ring-blue-500"
//                         : ""
//                     }
//                   `}
//                 >
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-base font-semibold text-foreground truncate">
//                       {h.resumeName || "Unnamed Resume"}
//                     </CardTitle>
//                     <p className="text-xs text-muted-foreground break-all truncate">
//                       ID: {h.reportId}
//                     </p>
//                   </CardHeader>

//                   <CardContent className="text-sm text-muted-foreground space-y-4">
//                     {h.analysis ? (
//                       <>
//                         <div className="flex flex-wrap gap-2">
//                           <Badge className="bg-green-600 text-white hover:bg-green-700">
//                             ATS Score: {h.analysis.ats_score}%
//                           </Badge>
//                           <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
//                             Suggestions: {h.analysis.suggestions.length}
//                           </Badge>
//                           <Badge className="bg-purple-600 text-white hover:bg-purple-700">
//                             Buzzwords: {h.analysis.buzzwords.length}
//                           </Badge>
//                           <Badge className="bg-red-500 text-white hover:bg-red-600">
//                             Missing: {h.analysis.missing_sections.length}
//                           </Badge>
//                         </div>

//                         <div
//                           className={`space-y-1 transition-all duration-300 ease-in-out ${
//                             isExpanded ? "" : "line-clamp-5"
//                           }`}
//                         >
//                           <p>
//                             <span className="font-semibold">Tone:</span>{" "}
//                             {h.analysis.tone_analysis || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Verdict:</span>{" "}
//                             {h.analysis.verdict_summary || "N/A"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Suggestions:</span>{" "}
//                             {h.analysis.suggestions?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Buzzwords:</span>{" "}
//                             {h.analysis.buzzwords?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">
//                               Repeated Phrases:
//                             </span>{" "}
//                             {h.analysis.repeated_phrases?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">Action Verbs:</span>{" "}
//                             {h.analysis.action_verbs?.join(", ") || "None"}
//                           </p>
//                           <p>
//                             <span className="font-semibold">
//                               Missing Sections:
//                             </span>{" "}
//                             {h.analysis.missing_sections?.join(", ") || "None"}
//                           </p>
//                         </div>

//                         <div className="pt-3 flex justify-between items-center">
//                           <Button
//                             variant="ghost"
//                             className="text-blue-600 hover:underline"
//                             onClick={() => toggleExpanded(h.reportId)}
//                           >
//                             {isExpanded ? (
//                               <>
//                                 Show Less <ChevronUp className="ml-1 w-4 h-4" />
//                               </>
//                             ) : (
//                               <>
//                                 Show More{" "}
//                                 <ChevronDown className="ml-1 w-4 h-4" />
//                               </>
//                             )}
//                           </Button>

//                           <Button
//                             variant="outline"
//                             className="text-destructive border-destructive hover:bg-destructive hover:text-white"
//                             size="sm"
//                             onClick={() => handleDelete(h.reportId)}
//                           >
//                             <Trash2 className="w-4 h-4 mr-1" />
//                             Delete
//                           </Button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-red-500">
//                         No analysis data available.
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisHistory;
