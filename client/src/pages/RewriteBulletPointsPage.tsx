import React, { useRef, useState} from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { aiSuggestionAnalyzeResume } from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, UploadCloud, FileText, Download, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalysisResponse } from "@/types/resumeAnalysis";
import { toast } from "sonner";

interface Rewrite {
  original: string;
  rewritten: string;
}

export const RewriteBulletPointsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [resumeName, setResumeName] = useState<string>("");
  const [rewrites, setRewrites] = useState<Rewrite[]>([]);
  const [applied, setApplied] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState<string>("");


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    toast.loading("Analyzing resume...", { id: "upload-toast" });

    try {
      const result = await dispatch(aiSuggestionAnalyzeResume(file));
      const data = result.payload as AnalysisResponse;

      if (data?.resumeUrl) {
        setResumeUrl(data.resumeUrl);
        setResumeName(data.resumeName);
        setRewrites(data.rewrites || []);
        setReportId(data.reportId);
        setApplied({});
        localStorage.setItem("resume-analysis-latest", JSON.stringify(data));
        toast.success("Resume analyzed successfully!", { id: "upload-toast" });
      } else {
        toast.error("Analysis failed.", { id: "upload-toast" });
      }
    } catch {
      toast.error("Something went wrong.", { id: "upload-toast" });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (original: string) => {
    const match = rewrites.find((r) => r.original === original);
    if (match) {
      setApplied((prev) => {
        const updated = { ...prev, [original]: match.rewritten };
        localStorage.setItem("applied-rewrites", JSON.stringify(updated));
        return updated;
      });
    }
  };

  // const handleDownloadUpdatedPdf = async () => {
  //   if (!reportId) return toast.error("No report ID available");

  //   toast.loading("Generating updated PDF...", { id: "pdf-toast" });
  //   try {
  //     await dispatch(downloadUpdatedPdfWithRewrites({
  //       reportId,
  //       appliedRewrites: applied,
  //     })).unwrap();
  //     toast.success("Updated PDF downloaded successfully!", { id: "pdf-toast" });
  //   } catch {
  //     toast.error("Failed to download updated PDF", { id: "pdf-toast" });
  //   }
  // };

  const handleDownloadUpdatedPdf = async () => {
  toast.info("Coming soon: Download updated PDF with AI rewrites");
};

  const handleUploadNewClick = () => {
    setResumeUrl("");
    setResumeName("");
    setRewrites([]);
    setApplied({});
    setReportId("");
    localStorage.removeItem("resume-analysis-latest");
    localStorage.removeItem("applied-rewrites");
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen px-6 py-10 text-foreground">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="text-yellow-500" /> AI Suggestions for Project Bullet Points
      </h1>

      {!resumeUrl ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center rounded-xl border p-10 bg-muted/50 shadow-inner backdrop-blur-md">
          <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">No resume uploaded</p>
          <p className="text-muted-foreground mb-4">Upload your resume to get live bullet suggestions.</p>
          <Button asChild>
            <label htmlFor="upload-resume" className="cursor-pointer">
              Upload Resume
            </label>
          </Button>
          <input
            type="file"
            id="upload-resume"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* PDF Viewer */}
          <div className="bg-background/30 border rounded-xl backdrop-blur-md shadow-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold flex gap-2 items-center">
                <FileText /> Resume Preview
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadUpdatedPdf}>
                  <Download className="w-4 h-4 mr-1" /> Download Updated PDF
                </Button>
                <Button variant="secondary" size="sm" onClick={handleUploadNewClick}>
                  <RefreshCcw className="w-4 h-4 mr-1" /> Upload New
                </Button>
              </div>
            </div>
            <iframe
              src={resumeUrl}
              title={resumeName}
              className="w-full h-[700px] rounded-md border"
            />
          </div>

          {/* Rewrite Panel */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ✍️ Bullet Point Suggestions
            </h2>

            {rewrites.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No bullet points were extracted from your projects section.
              </p>
            ) : (
              rewrites.map((item, idx) => (
                <Card
                  key={idx}
                  className={cn(
                    "backdrop-blur-lg bg-white/70 dark:bg-black/30 border border-border/60 transition-all duration-300 shadow-md",
                    applied[item.original] && "ring-2 ring-green-500"
                  )}
                >
                  <CardContent className="py-5 space-y-2">
                    <div className="text-sm text-muted-foreground">Original:</div>
                    <p className="text-foreground">{item.original}</p>

                    <div className="text-sm text-muted-foreground">AI Suggestion:</div>
                    <p className="italic text-green-700 dark:text-green-400">
                      {item.rewritten}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => handleApply(item.original)}
                    >
                      Apply Suggestion
                    </Button>

                    {applied[item.original] && (
                      <p className="text-sm mt-2 text-blue-600 dark:text-blue-300">
                        ✅ Applied: {applied[item.original]}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

















