import express from "express";
import type { Request, Response } from "express";
import { listTrials, getTrialById } from "./services/trial-service.js";
import { getTrialSummary } from "./services/analysis-service.js";

const app = express();
app.use(express.json());

app.get("/trials", (req: Request, res: Response) => {
  const { phase, status, minEnrollment, sponsor, search, sort, order } =
    req.query;

  const result = listTrials({
    phase: phase as string | undefined,
    status: status as string | undefined,
    minEnrollment: minEnrollment ? Number(minEnrollment) : undefined,
    sponsor: sponsor as string | undefined,
    search: search as string | undefined,
    sort: sort as string | undefined,
    order: order as string | undefined,
  });

  res.json(result);
});

app.get("/trials/:id", (req: Request<{ id: string }>, res: Response) => {
  const trial = getTrialById(req.params.id);
  if (!trial) {
    res.status(404).json({ error: "Trial not found" });
    return;
  }
  res.json(trial);
});

app.get("/trials/:id/summary", (req: Request<{ id: string }>, res: Response) => {
  const trial = getTrialById(req.params.id);
  if (!trial) {
    res.status(404).json({ error: "Trial not found" });
    return;
  }
  res.json(getTrialSummary(trial));
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env["PORT"] ?? 3000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
