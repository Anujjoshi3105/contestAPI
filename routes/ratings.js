const express = require("express");
const { getCodeforcesRating } = require("../services/codeforces");
const { getCodechefRating } = require("../services/codechef");
const { getLeetcodeRating } = require("../services/leetcode");
const { getGfgRating } = require("../services/gfg");
const validateUsername = require("../middlewares/validate");

const router = express.Router();

router.get("/ratings", validateUsername, async (req, res) => {
  const { username } = req;
  try {
    const [codeforces, codechef, leetcode, gfg] = await Promise.all([
      getCodeforcesRating(username),
      getCodechefRating(username),
      getLeetcodeRating(username),
      getGfgRating(username),
    ]);

    res.json({
      username,
      codeforces,
      codechef,
      leetcode,
      gfg,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching ratings" });
  }
});

router.get("/ratings/:platform", validateUsername, async (req, res) => {
  const { username } = req;
  const { platform } = req.params;

  try {
    let rating;
    switch (platform.toLowerCase()) {
      case "codeforces":
        rating = await getCodeforcesRating(username);
        break;
      case "codechef":
        rating = await getCodechefRating(username);
        break;
      case "leetcode":
        rating = await getLeetcodeRating(username);
        break;
      case "gfg":
        rating = await getGfgRating(username);
        break;
      default:
        return res.status(400).json({ error: "Invalid platform" });
    }

    res.json({ platform, username, rating });
  } catch (error) {
    res.status(500).json({ error: `Error fetching ${platform} rating` });
  }
});

module.exports = router;
