const express = require("express");
const config = require("config");
const Url = require("../models/Url");

const router = express.Router();

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (!url) {
      return res.status(404).json("no url found");
    }

    return res.redirect(url.longUrl);
  } catch (error) {
    console.log("error occured", error);
    res.json({
      message: "An error Occured",
      error,
    });
  }
});

module.exports = router;
