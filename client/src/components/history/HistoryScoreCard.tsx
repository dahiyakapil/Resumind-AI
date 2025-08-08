// src/components/ScoreCard.tsx
import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";

const HistoryScoreCard = () => {
  const score = useAppSelector((s) => s.resumeAnalysis.data?.analysis?.ats_score ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          🎯 ATS Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              textColor: "#FFFFFF",
              pathColor: score >= 80 ? "#22c55e" : score >= 60 ? "#facc15" : "#ef4444",
              trailColor: "#1f2937",
              textSize: "18px",
            })}
          />
        </div>
      </CardContent>
    </motion.div>
  );
};

export default HistoryScoreCard;
