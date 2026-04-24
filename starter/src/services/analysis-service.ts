import type { ClinicalTrial } from "../types.js";

export function getTrialSummary(trial: ClinicalTrial): {
  id: string;
  name: string;
  riskScore: number;
  summary: string;
} {
  const riskScore = calculateRiskScore(trial);

  const summary = [
    `${trial.name} is a Phase ${trial.phase} ${trial.status} trial`,
    `studying ${trial.indication}.`,
    `Current response rate: ${trial.responseRate!.toFixed(1)}%.`,
    `Adverse event rate: ${trial.adverseEventRate}%.`,
    `Key findings: ${trial.keyFindings.join("; ")}`,
  ].join(" ");

  return { id: trial.id, name: trial.name, riskScore, summary };
}

function calculateRiskScore(trial: ClinicalTrial): number {
  let score = 0;

  // Higher AE rate = higher risk
  if (trial.adverseEventRate > 50) score += 3;
  else if (trial.adverseEventRate > 30) score += 2;
  else score += 1;

  // Terminated trials are highest risk
  if (trial.status === "terminated") score += 3;

  // Phase I = higher uncertainty
  if (trial.phase === "I") score += 1;

  if (trial.responseRate !== null && trial.responseRate > 30) {
    score += 2;
  }

  return score;
}
