import { Router } from "express";
import type { Request, Response } from "express";
import { listTrials, getTrialById } from "../services/trial-service.js";
import { getTrialSummary } from "../services/analysis-service.js";
import type { TrialListResponse } from "../types.js";

const router = Router();

router.get("/", (req: Request, res: Response<TrialListResponse>) => {
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

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const trial = getTrialById(req.params.id);
  if (!trial) {
    res.status(404).json({ error: "Trial not found" });
    return;
  }
  res.json(trial);
});

router.get(
  "/:id/summary",
  (req: Request<{ id: string }>, res: Response) => {
    const trial = getTrialById(req.params.id);
    if (!trial) {
      res.status(404).json({ error: "Trial not found" });
      return;
    }

    const summary = getTrialSummary(trial);
    res.json(summary);
  }
);

export { router as trialsRouter };
