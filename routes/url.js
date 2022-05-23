const express = require("express");
const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
const config = require("config");
const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("BASE_URL");

  // check if urls are valid
  if (!validUrl.isUri(baseUrl) || !validUrl.isUri(longUrl)) {
    return res.status(401).json("Invalid URL");
  }

  // create URL code
  const shortCode = nanoid(10);

  try {
    const url = new Url({
      urlCode: shortCode,
      createdAt: new Date(),
      longUrl,
    });

    await url.save();
    return res.json({
      shortUrl: baseUrl + "/" + shortCode,
      urlCode: shortCode,
      createdAt: new Date(),
      longUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

module.exports = router;
