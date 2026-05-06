import express from "express";
import { trialsRouter } from "./routes/trials.js";

const app = express();
app.use(express.json());

app.use("/trials", trialsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env["PORT"] ?? 3000);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
