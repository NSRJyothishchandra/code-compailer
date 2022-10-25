const cors  = require("cors");
const express = require('express')
// import fetch from "node-fetch";
// import dotenv from "dotenv";
const fetch  = require("node-fetch");
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config();

// Create express app
const api = express.Router();

// Middlewares
api.use(cors());

api.use(bodyParser.json());

// Get language code and version according to JDoodle API
const languagesMap = {
  cpp: ["cpp14", "3"],
  c: ["c", "3"],
  java: ["java", "1"],
  python: ["python3", "3"],
};

// Post request to create submission
api.post("/api/submission", async (req, res) => {
  try {
    const [language, versionIndex] = languagesMap[req.body.language];

    const inputParams = {
      ...req.body,
      language,
      versionIndex,
      clientId:"df028803f0141f1e74b87a3c2ca7210a",
      clientSecret: "e51a90aa96323038fed06487d59fa622685535335091ff3dee19b17f8d8c8c6",
    };

    const resp = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "post",
      body: JSON.stringify(inputParams),
      headers: { "Content-type": "application/json" },
    });

    const data = await resp.json();

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = api


// df028803f0141f1e74b87a3c2ca7210a
// e51a90aa96323038fed06487d59fa622685535335091ff3dee19b17f8d8c8c6