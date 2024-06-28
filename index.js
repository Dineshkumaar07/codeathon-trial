// server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://code-a-thon-2f494-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

app.get("/api/questions", async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const snapshot = await db
      .ref("forms/vehicle_inspection/sections")
      .once("value");
    const data = snapshot.val();

    const formattedSections = Object.keys(data).map((sectionKey) => {
      const section = data[sectionKey];
      return {
        id: sectionKey,
        title: section.title[lang],
        questions: Object.keys(section.questions).map((questionKey) => {
          const question = section.questions[questionKey];
          return {
            id: questionKey,
            text: question[lang],
            type: question.type,
            options: question.options,
          };
        }),
      };
    });

    res.json(formattedSections);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
