const axios = require("axios");

const getCodeforcesRating = async (username) => {
  try {
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await axios.get(url);
    const rating = response.data.result[0].rating;
    const level = response.data.result[0].rank;
    const maxRating = response.data.result[0].maxRating;
    const maxLevel = response.data.result[0].maxRank;

    return { rating, level, maxRating, maxLevel } || "Unrated";
  } catch {
    return "Error fetching Codeforces rating";
  }
};

module.exports = { getCodeforcesRating };
