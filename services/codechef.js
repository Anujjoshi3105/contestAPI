const axios = require("axios");
const cheerio = require("cheerio");

const getLevel = (rating) => {
  if (rating >= 2500) return "7 star";
  if (rating >= 2200) return "6 star";
  if (rating >= 2000) return "5 star";
  if (rating >= 1800) return "4 star";
  if (rating >= 1600) return "3 star";
  if (rating >= 1400) return "2 star";
  return "1 star";
};

const getCodechefRating = async (username) => {
  const url = `https://www.codechef.com/users/${username}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const rating = parseInt($(".rating-number").first().text().trim()) || "N/A";
    const max_rating =
      parseInt($(".rating-header small").first().text().match(/\d+/)?.[0]) ||
      "N/A";

    return rating !== "N/A"
      ? {
          username: username,
          platform: "codechef",
          rating,
          level: getLevel(rating),
          max_rating,
        }
      : { error: "Error fetching CodeChef rating. User may not exist." };
  } catch {
    return {
      error: "Error fetching CodeChef rating. Check username or network.",
    };
  }
};

getCodechefRating("anujjoshi3105").then(console.log).catch(console.error);

module.exports = { getCodechefRating };
