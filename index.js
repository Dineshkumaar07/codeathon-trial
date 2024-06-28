const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

const app = express();
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://code-a-thon-2f494-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

// Endpoint to fetch header questions
app.get("/api/questions/header", async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const snapshot = await db
      .ref("forms/vehicle_inspection/sections/header/questions")
      .once("value");
    const questions = snapshot.val();

    // Format questions based on language
    const formattedQuestions = Object.keys(questions).map((questionKey) => ({
      id: questionKey,
      text: questions[questionKey][lang],
      type: questions[questionKey].type,
      options: questions[questionKey].options || [],
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching header questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to fetch tires questions
app.get("/api/questions/tires", async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const snapshot = await db
      .ref("forms/vehicle_inspection/sections/tires/questions")
      .once("value");
    const questions = snapshot.val();

    // Format questions based on language
    const formattedQuestions = Object.keys(questions).map((questionKey) => ({
      id: questionKey,
      text: questions[questionKey][lang],
      type: questions[questionKey].type,
      options: questions[questionKey].options || [],
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching tires questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
