import express from "express";
import { publishToVercel } from "./utils/publish.js";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors()); // ✅ allow all origins
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