import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Target, FileText, ThumbsUp, ThumbsDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AnalysisResultProps {
  score: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  verdict: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  score,
  missingKeywords,
  matchedKeywords,
  strengths,
  weaknesses,
  suggestions,
  verdict
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 400);
    return () => clearTimeout(timer);
  }, [score]);

  const scoreColor =
    score >= 90 ? 'from-green-400 to-emerald-500' :
    score >= 75 ? 'from-lime-400 to-yellow-400' :
    'from-orange-400 to-red-500';

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Score Card */}
      <div className="rounded-xl glass-card p-6 text-center backdrop-blur-sm bg-white/10 dark:bg-black/30 border border-white/10">
        <div className="mb-4">
          <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${scoreColor} flex items-center justify-center shadow-md`}>
            <Target className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          {animatedScore}%
        </h2>
        <p className="text-muted-foreground mt-2">
          {score >= 90 ? 'Excellent Match' : score >= 75 ? 'Good Match' : score >= 60 ? 'Average Match' : 'Needs Work'}
        </p>
        <div className="mt-4 w-full bg-border rounded-full h-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out bg-gradient-to-r ${scoreColor}`}
            style={{ width: `${animatedScore}%` }}
          />
        </div>
      </div>

      {/* Missing Keywords */}
      <div className="glass-card p-6 rounded-xl border border-orange-500/20 bg-orange-100/10 dark:bg-orange-900/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Missing Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((word, i) => (
            <Badge key={i} variant="secondary" className="bg-orange-200 dark:bg-orange-800/30 text-orange-900 dark:text-orange-200">
              {word}
            </Badge>
          ))}
        </div>
      </div>

      {/* Matched Keywords */}
      <div className="glass-card p-6 rounded-xl border border-emerald-500/20 bg-emerald-100/10 dark:bg-emerald-900/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Matched Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {matchedKeywords.map((word, i) => (
            <Badge key={i} variant="secondary" className="bg-emerald-200 dark:bg-emerald-800/30 text-emerald-900 dark:text-emerald-200">
              {word}
            </Badge>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="glass-card p-6 rounded-xl border border-green-400/20 bg-green-100/10 dark:bg-green-900/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Strengths</h3>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {strengths.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="glass-card p-6 rounded-xl border border-yellow-400/20 bg-yellow-100/10 dark:bg-yellow-900/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
            <ThumbsDown className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Weaknesses</h3>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {weaknesses.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="glass-card p-6 rounded-xl border border-indigo-400/20 bg-indigo-100/10 dark:bg-indigo-900/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Suggestions for Improvement</h3>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Final Verdict */}
      <div className="glass-card p-6 border-l-4 border-primary bg-white/10 dark:bg-black/30 rounded-xl shadow">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Final Verdict</h3>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {verdict}
        </p>
      </div>
    </div>
  );
};
