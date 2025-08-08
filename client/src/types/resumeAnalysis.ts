export interface Rewrite {
  original: string;
  rewritten: string;
}

export interface AnalysisDetails {
  ats_score: number;
  suggestions: string[];
  buzzwords: string[];
  missing_sections: string[];
  tone_analysis: string;
  action_verbs: string[];
  repeated_phrases: string[];
  verdict_summary: string;
}

export interface AnalysisResponse {
  message: string;
  resumeUrl: string;
  reportId: string;
  resumeName: string;
  createdAt: string;
  analysis: AnalysisDetails;
  rewrites: Rewrite[]; 
}



