import React from "react";
import { useAppSelector } from "@/hooks/redux";

const ScoreCard: React.FC = () => {
  const data = useAppSelector((s) => s.resumeAnalysis.data);
  if (!data) return null;

const score = data.analysis?.ats_score ?? 0;


  return (
    <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-xl p-8 text-center text-white relative overflow-hidden">
      <div className="text-lg font-semibold mb-1">Resume Analysis Complete</div>
      <div className="flex items-baseline justify-center gap-2">
        <div className="text-8xl font-bold text-green-400">{score}</div>
        <div className="text-2xl font-medium text-white">/100</div>
      </div>
      <div className="mt-4">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden w-96 mx-auto">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="mt-2 text-sm">ATS Compatibility Score</div>
      </div>
    </div>
  );
};

export default ScoreCard;
