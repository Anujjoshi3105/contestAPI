const axios = require("axios");

const getCodeforcesRating = async (username) => {
  try {
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await axios.get(url);
    return response.data.result[0].rating || "Unrated";
  } catch {
    return "Error fetching Codeforces rating";
  }
};

module.exports = { getCodeforcesRating };
