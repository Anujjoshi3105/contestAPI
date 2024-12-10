const axios = require("axios");
const cheerio = require("cheerio");

const getGfgRating = async (username) => {
  try {
    const url = `https://www.geeksforgeeks.org/user/${username}/`;
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const scriptContent = $("script#__NEXT_DATA__").html();

    if (scriptContent) {
      const jsonData = JSON.parse(scriptContent);

      const currentRating =
        jsonData?.props?.pageProps?.contestData?.user_contest_data
          ?.current_rating;
      const level = jsonData?.props?.pageProps?.contestData?.user_stars;

      return { rating: currentRating, level: `${level} star` } || "Unrated";
    } else {
      return "Script tag with JSON data not found";
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return "Error fetching GFG user data";
  }
};

module.exports = { getGfgRating };
getGfgRating("anujjoshi31")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
