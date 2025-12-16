import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getDealContext } from "./services/pipedrive";
import { initConversation } from "./services/openai";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.get("/api/v1/user-context", (req, res) => {
  res.json({
    context: getDealContext(),
  });
});

app.get("/api/v1/init-conversation", async (req, res) => {
  try {
    const response = await initConversation(req.query.input as string);
    res.json(response);
  } catch (error) {
    console.error("Error in init-conversation:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
