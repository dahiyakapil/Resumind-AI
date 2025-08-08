import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  FileWarning,
  UserCheck2,
  ZapIcon,
  QuoteIcon,
  GaugeIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const Suggestions: React.FC = () => {
  const data = useAppSelector((s) => s.resumeAnalysis.data);

  const analysis = data?.analysis;

  if (!analysis) return null;

  const {
    suggestions = [],
    buzzwords = [],
    missing_sections = [],
    tone_analysis = "",
    action_verbs = [],
    repeated_phrases = [],
    verdict_summary = "",
  } = analysis;

  const GlassCard = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* ✅ Suggestions */}
      <GlassCard delay={0}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <CheckCircle2 className="text-green-400 w-5 h-5" />
            Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pl-4">
          <ul className="space-y-2">
            {suggestions.map((sugg, i) => (
              <li
                key={i}
                className="flex gap-2 items-start text-sm text-muted-foreground"
              >
                <CheckCircle2 className="text-green-500 mt-1 w-4 h-4" />
                {sugg}
              </li>
            ))}
          </ul>
        </CardContent>
      </GlassCard>

      {/* ✅ Buzzwords */}
      <GlassCard delay={0.1}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <ZapIcon className="text-yellow-400 w-5 h-5" /> Buzzwords Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {buzzwords.map((term, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                {term}
              </span>
              <Badge variant="destructive" className="text-xs">
                x
              </Badge>
            </div>
          ))}
        </CardContent>
      </GlassCard>

      {/* ✅ Missing Sections */}
      <GlassCard delay={0.2}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <FileWarning className="text-red-400 w-5 h-5" /> Missing Sections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {missing_sections.map((section, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                {section}
              </span>
              <Badge variant="secondary" className="text-xs">
                Optional
              </Badge>
            </div>
          ))}
        </CardContent>
      </GlassCard>

      {/* ✅ Action Verbs */}
      <GlassCard delay={0.3}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <CheckCircle2 className="text-green-400 w-5 h-5" /> Strong Action
            Verbs
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {action_verbs.map((verb, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-xs border-green-500 text-green-400"
            >
              {verb}
            </Badge>
          ))}
        </CardContent>
      </GlassCard>

      {/* ✅ Repeated Phrases */}
      <GlassCard delay={0.4}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <QuoteIcon className="text-yellow-300 w-5 h-5" /> Repeated Phrases
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {repeated_phrases.map((phrase, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-muted">
              {phrase}
            </Badge>
          ))}
        </CardContent>
      </GlassCard>

      {/* ✅ Tone Analysis */}
      {tone_analysis && (
        <GlassCard delay={0.5}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              <GaugeIcon className="text-blue-400 w-5 h-5" /> Tone Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-lg font-bold text-primary">
              {tone_analysis.split(",")[0]}
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full text-xs text-center text-white"
                style={{ width: "85%" }}
              >
                85% confidence
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {tone_analysis}
            </p>
          </CardContent>
        </GlassCard>
      )}

      {/* ✅ Final Verdict */}
      <GlassCard delay={0.6}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <UserCheck2 className="text-blue-300 w-5 h-5" /> Final Verdict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200 text-base font-medium">
            {verdict_summary || "Good foundation with room for improvement"}
          </p>
        </CardContent>
      </GlassCard>
    </div>
  );
};

export default Suggestions;
