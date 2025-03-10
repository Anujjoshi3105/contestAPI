const axios = require("axios");
const cheerio = require("cheerio");

function getLevel(rating) {
  if (rating >= 2800) {
    return "Red";
  } else if (rating >= 2400) {
    return "Orange";
  } else if (rating >= 2000) {
    return "Yellow";
  } else if (rating >= 1600) {
    return "Blue";
  } else if (rating >= 1200) {
    return "Cyan";
  } else if (rating >= 800) {
    return "Green";
  } else if (rating >= 400) {
    return "Brown";
  } else {
    return "Gray";
  }
}
async function getAtcoderRating(username) {
  const url = `https://atcoder.jp/users/${username}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const extractText = (label) =>
      $(`th:contains('${label}')`)
        .next("td")
        .text()
        .replace(/\s+/g, " ")
        .trim() || "N/A";

    const rating = parseInt(extractText("Rating").split(" ")[0]);
    const max_rating = parseInt(extractText("Highest Rating").split(" ")[0]);
    const rank = extractText("Rank");
    const contests_participated = parseInt(extractText("Rated Matches"));

    return {
      username: username,
      platform: "atcoder",
      rating: rating,
      max_rating: max_rating,
      rank: rank,
      contests_participated: contests_participated,
      level: getLevel(rating),
    };
  } catch (error) {
    console.error(
      "Failed to fetch AtCoder user data. Check username or network connection."
    );
    return null;
  }
}

getAtcoderRating("anujjoshi3105").then(console.log).catch(console.error);

module.exports = { getAtcoderRating };
