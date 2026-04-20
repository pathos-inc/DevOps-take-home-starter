export interface ClinicalTrial {
  id: string;
  name: string;
  sponsor: string;
  phase: "I" | "II" | "III";
  status: "recruiting" | "completed" | "terminated";
  indication: string;
  primaryEndpoint: string;
  enrollment: number;
  startDate: string;
  estimatedCompletionDate: string;
  adverseEventRate: number;
  responseRate: number | null;
  keyFindings: string[];
}

export type AnalysisFocus = "safety" | "efficacy" | "competitive";

export interface TrialListResponse {
  trials: ClinicalTrial[];
  total: number;
}

export interface AnalyzeRequest {
  focus: AnalysisFocus;
}

export interface ErrorResponse {
  error: string;
}
