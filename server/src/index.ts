import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Debug on startup
console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  PIPEDRIVE_KEY_SET: !!process.env.PIPEDRIVE_KEY,
  OPENAI_KEY_SET: !!process.env.OPENAI_API_KEY,
  ALL_ENV_KEYS: Object.keys(process.env).filter(k => k.includes('PIPE') || k.includes('OPENAI') || k.includes('PORT'))
});

import { getDealContext } from "./services/pipedrive";
import { chat } from "./services/openai";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.get("/api/v1/user-context", async (req, res) => {
  try {
    const context = await getDealContext();
    res.json({ context });
  } catch (error) {
    console.error("Error fetching context:", error);
    res.status(500).json({ error: "Failed to fetch context" });
  }
});

app.post("/api/v1/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.status(400).json({ error: "message and sessionId required" });
    }
    const response = await chat(sessionId, message);
    res.json(response);
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
