import React from "react";
import { motion } from "framer-motion";
import UploadArea from "@/components/UploadArea";
import ScoreCard from "@/components/ScoreCard";
import Suggestions from "@/components/Suggestions";
// import AnalysisHistory from "@/components/AnalysisHistory";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wand2Icon, RocketIcon, TimerIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCurrent } from "@/app/features/resumeAnalysis/resumeAnalysisSlice";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";

const ResumeAnalysisPage: React.FC = () => {
  const dispatch = useDispatch();
  const resumeUrl = useAppSelector((s) => s.resumeAnalysis.data?.resumeUrl);

  return (
    <div className="min-h-screen text-foreground py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ⚡️ Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Supercharge Your Resume <br className="hidden md:block" />
            with <span className="text-primary">AI</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get instant ATS score, suggestions, buzzword alerts, and
            recruiter-ready feedback.
          </motion.p>

          <motion.div
            className="flex justify-center flex-wrap gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
            >
              <Wand2Icon className="h-4 w-4" /> AI-Powered Analysis
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow"
            >
              <RocketIcon className="h-4 w-4" /> ATS Optimization
            </Badge>
            <Badge
              variant="secondary"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow"
            >
              <TimerIcon className="h-4 w-4" /> Instant Results
            </Badge>
          </motion.div>
        </motion.div>

        {/* 📝 Upload Area */}
        <UploadArea />

        {/* 📄 Resume Preview */}
        {/* {resumeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">
                📄 Resume Preview
              </h3>
              <a
                href={resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Download PDF
                </Button>
              </a>
            </div>

            <div className="rounded-xl overflow-hidden border border-border shadow-xl">
              <iframe
                src={resumeUrl}
                width="100%"
                height="600px"
                className="rounded-lg"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        )} */}

        {resumeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4"
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-xl font-bold text-foreground">
                📄 Resume Preview
              </h3>

              <div className="flex flex-wrap gap-2">
                <a
                  href={resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Download PDF
                  </Button>
                </a>

                <Button
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-white dark:hover:bg-destructive dark:hover:text-white"
                  onClick={() => dispatch(clearCurrent())}
                >
                  Clear Previous Analysis
                </Button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border shadow-xl">
              <iframe
                src={resumeUrl}
                width="100%"
                height="600px"
                className="rounded-lg"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        )}

        {/* 🧱 Separator */}
        <Separator className="my-6" />

        {/* 📊 Analysis Section */}
        <div className="space-y-8">
          <ScoreCard />
          <Suggestions />

          {/* 👇 Conditionally Render Clear Button
          {resumeUrl && (
            <div className="flex justify-between">
              <Button
                onClick={() => dispatch(clearCurrent())}
                className="text-sm bg-red-500 text-white hover:bg-red-800 mt-2"
              >
                Clear Previous Analysis
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisPage;
