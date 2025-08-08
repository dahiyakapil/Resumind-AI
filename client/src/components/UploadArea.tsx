
// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { analyzeResume } from "@/app/features/resumeAnalysis/resumeAnalysisSlice";

// const UploadArea: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { loading, data, error } = useAppSelector((s) => s.resumeAnalysis);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error("File size exceeds 10MB limit.");
//       return;
//     }

//     setUploadedFile(file);
//   }, []);

//   const handleAnalyze = () => {
//     if (!uploadedFile) return;

//     const confirmed = window.confirm("Do you want to analyze this resume?");
//     if (confirmed) {
//       dispatch(analyzeResume(uploadedFile));
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error("Analysis failed", {
//         description: error,
//       });
//     }
//   }, [error]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     maxSize: 10 * 1024 * 1024,
//   });

//   return (
//     <div className="space-y-6">
//       {!data && !uploadedFile && (
//         <Card
//           {...getRootProps()}
//           className="border-dashed border-2 border-muted-foreground hover:border-primary transition cursor-pointer"
//         >
//           <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
//             <input {...getInputProps()} />
//             <div className="text-4xl">⬆️</div>
//             <Label className="text-lg font-semibold">Upload your resume</Label>
//             <p className="text-sm text-muted-foreground">
//               Drag and drop or click to upload • PDF only • Max 10MB
//             </p>
//             {isDragActive && (
//               <p className="text-green-500 text-sm">Drop to upload</p>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {uploadedFile && !data && (
//         <Card className="bg-muted">
//           <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="text-xl">📄</div>
//               <div>
//                 <p className="font-semibold">{uploadedFile.name}</p>
//                 <p className="text-sm text-muted-foreground">
//                   {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Button
//                 onClick={handleAnalyze}
//                 disabled={loading}
//                 variant="default"
//               >
//                 {loading ? "Analyzing..." : "Analyze Resume"}
//               </Button>
//               <Button
//                 variant="secondary"
//                 disabled={loading}
//                 onClick={() => setUploadedFile(null)}
//               >
//                 Upload New
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {loading && (
//         <div className="flex items-center gap-3">
//           <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-blue-500" />
//           <span className="text-sm text-muted-foreground">
//             Analyzing your resume...
//           </span>
//         </div>
//       )}

//       {data && (
//         <Card className="bg-muted">
//           <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="text-xl">📄</div>
//               <div>
//                 <p className="font-semibold">Report ID: {data.reportId}</p>
//                 <p className="text-sm text-muted-foreground">Resume processed</p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <a
//                 href={data.resumeUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button variant="outline">View Resume</Button>
//               </a>
//               <Button
//                 variant="secondary"
//                 onClick={() => {
//                   setUploadedFile(null);
//                   window.location.reload();
//                 }}
//               >
//                 Upload New
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default UploadArea;





import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { analyzeResume } from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const UploadArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, data, error } = useAppSelector((s) => s.resumeAnalysis);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setPendingFile(file);
    setShowDialog(true);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
      setShowDialog(true);
    }
  };

  const handleAnalyze = async () => {
    if (!pendingFile) return;

    toast.loading("Analyzing resume...", { id: "upload-toast" });
    try {
      await dispatch(analyzeResume(pendingFile)).unwrap();
      setUploadedFile(pendingFile);
      toast.success("Resume analyzed successfully!", { id: "upload-toast" });
    } catch {
      toast.error("Something went wrong.", { id: "upload-toast" });
    } finally {
      setPendingFile(null);
      setShowDialog(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Analysis failed", {
        description: error,
      });
    }
  }, [error]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <>
      <div className="space-y-6">
        {!data && !uploadedFile && (
          <Card
            {...getRootProps()}
            className="border-dashed border-2 border-muted-foreground hover:border-primary transition cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
              <input {...getInputProps()} />
              <div className="text-4xl">⬆️</div>
              <Label className="text-lg font-semibold">Upload your resume</Label>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to upload • PDF only • Max 10MB
              </p>
              {isDragActive && (
                <p className="text-green-500 text-sm">Drop to upload</p>
              )}
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </CardContent>
          </Card>
        )}

        {uploadedFile && !data && (
          <Card className="bg-muted">
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="text-xl">📄</div>
                <div>
                  <p className="font-semibold">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button disabled variant="default">
                  Resume Ready
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setUploadedFile(null)}
                >
                  Upload New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-blue-500" />
            <span className="text-sm text-muted-foreground">
              Analyzing your resume...
            </span>
          </div>
        )}

        {data && (
          <Card className="bg-muted">
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="text-xl">📄</div>
                <div>
                  <p className="font-semibold">Report ID: {data.reportId}</p>
                  <p className="text-sm text-muted-foreground">
                    Resume processed
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">View Resume</Button>
                </a>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setUploadedFile(null);
                    window.location.reload();
                  }}
                >
                  Upload New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ✅ Confirmation Dialog */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to analyze this resume?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setPendingFile(null);
                setShowDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAnalyze}>
              Yes, Analyze
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadArea;


















// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import { analyzeResume } from "@/features/resumeAnalysis/resumeAnalysisSlice";

// const UploadArea: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { loading, data, error } = useAppSelector((s) => s.resumeAnalysis);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error("🚫 File size exceeds 10MB limit.");
//       return;
//     }

//     setUploadedFile(file);
//   }, []);

//   const handleAnalyze = () => {
//     if (!uploadedFile) return;
//     const confirmed = window.confirm("Do you want to analyze this resume?");
//     if (confirmed) dispatch(analyzeResume(uploadedFile));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error("Analysis failed", { description: error });
//     }
//   }, [error]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     maxSize: 10 * 1024 * 1024,
//   });

//   return (
//     <motion.div
//       className="space-y-6"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Upload Card */}
//       {!data && !uploadedFile && (
//         <motion.div whileHover={{ scale: 1.02 }} {...getRootProps()}>
//           <Card className="border-dashed border-2 border-muted-foreground hover:border-primary transition cursor-pointer shadow-sm">
//             <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
//               <input {...getInputProps()} />
//               <div className="text-5xl animate-bounce">⬆️</div>
//               <Label className="text-xl font-semibold text-foreground">Upload your resume</Label>
//               <p className="text-sm text-muted-foreground">
//                 Drag & drop or click to upload • PDF only • Max 10MB
//               </p>
//               {isDragActive && (
//                 <p className="text-success text-sm">Drop it here 👇</p>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}

//       {/* File Preview */}
//       {uploadedFile && !data && (
//         <motion.div
//           className="bg-muted rounded-lg shadow"
//           initial={{ opacity: 0, scale: 0.97 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           <Card>
//             <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="text-2xl">📄</div>
//                 <div>
//                   <p className="font-medium text-foreground">{uploadedFile.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
//                   </p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <Button onClick={handleAnalyze} disabled={loading} variant="default">
//                   {loading ? "Analyzing..." : "Analyze Resume"}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   disabled={loading}
//                   onClick={() => setUploadedFile(null)}
//                 >
//                   Upload New
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}

//       {/* Loading Spinner */}
//       {loading && (
//         <motion.div
//           className="flex items-center gap-3 text-sm text-muted-foreground"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-blue-500" />
//           Analyzing your resume...
//         </motion.div>
//       )}

//       {/* Analysis Done */}
//       {data && (
//         <motion.div
//           className="bg-muted rounded-lg shadow"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <Card>
//             <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="text-2xl">📄</div>
//                 <div>
//                   <p className="font-medium text-foreground">Report ID: {data.reportId}</p>
//                   <p className="text-sm text-muted-foreground">Resume processed successfully</p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer">
//                   <Button variant="outline">View Resume</Button>
//                 </a>
//                 <Button
//                   variant="secondary"
//                   onClick={() => {
//                     setUploadedFile(null);
//                     window.location.reload();
//                   }}
//                 >
//                   Upload New
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default UploadArea;


