import express from "express";
import cors from "cors";
import { publishToVercel } from "./publish.js";
import dotenv from "dotenv";
dotenv.config()
const app = express();

app.use(cors()); // ✅ allow all origins
app.use(express.json());

app.post("/publish", async (req, res) => {
  try {
    const { html } = req.body;

    const url = await publishToVercel(html);

    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});