const axios = require("axios");

const getCodeforcesRating = async (username) => {
  const url = `https://codeforces.com/api/user.info?handles=${username}`;

  try {
    const { data } = await axios.get(url);
    const user = data.result[0];

    return {
      username: username,
      platform: "codeforces",
      rating: user.rating || "Unrated",
      level: user.rank || "Unrated",
      max_rating: user.maxRating || "Unrated",
      max_level: user.maxRank || "Unrated",
    };
  } catch (error) {
    return {
      error: "Error fetching Codeforces rating. Check username or network.",
    };
  }
};

getCodeforcesRating("anujjoshi3105").then(console.log).catch(console.error);

module.exports = { getCodeforcesRating };
