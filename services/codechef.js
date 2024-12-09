const axios = require("axios");
const cheerio = require("cheerio");

const getLevel = (rating) => {
  if (rating <= 1399) return "1 star";
  if (rating <= 1599) return "2 star";
  if (rating <= 1799) return "3 star";
  if (rating <= 1999) return "4 star";
  if (rating <= 2199) return "5 star";
  if (rating <= 2499) return "6 star";
  return "7 star";
};

const getCodechefRating = async (username) => {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const rating = parseInt($(".rating-number").first().text().trim());
    const level = getLevel(rating);
    return rating ? { rating, level } : "Error fetching Codechef Rating";
  } catch {
    return "Error fetching CodeChef rating";
  }
};

module.exports = { getCodechefRating };
