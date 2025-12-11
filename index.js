import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: prompt,
      }),
    });
    const data = await response.json();
    res.send(data);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(process.env.PORT || 10000, () =>
  console.log("Server running")
);
