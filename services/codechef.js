const axios = require("axios");
const cheerio = require("cheerio"); // Make sure cheerio is required

const getCodechefRating = async (username) => {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const ratingText = $(".rating-number").first().text().trim();
    return ratingText ? Number(ratingText) : "Unrated";
  } catch {
    return "Error fetching CodeChef rating";
  }
};

module.exports = { getCodechefRating };
