const axios = require("axios");
const cheerio = require("cheerio");

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

    return {
      username: username,
      platform: "atcoder",
      rating: parseInt(extractText("Rating").split(" ")[0]),
      max_rating: parseInt(extractText("Highest Rating").split(" ")[0]),
      rank: extractText("Rank"),
      contests_participated: parseInt(extractText("Rated Matches")),
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
