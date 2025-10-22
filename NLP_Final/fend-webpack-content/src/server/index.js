const dotenv = require("dotenv");
const axios = require("axios");
const express = require("express");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("dist"));

const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      "https://api.meaningcloud.com/sentiment-2.1",
      null,
      {
        params: {
          key: process.env.MEANINGCLOUD_API_KEY,
          txt: text,
          lang: "en",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
  }
};

app.post("/analyze", async (req, res) => {
  const { text } = req.body;
  try {
    const sentimentData = await analyzeSentiment(text);
    res.send(sentimentData);
  } catch (error) {
    res.status(500).send({ error: "Failed to analyze sentiment" });
  }
});

// server starts
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
