const axios = require("axios");

const getGfgRating = async (username) => {
  try {
    const url = `https://www.geeksforgeeks.org/gfg-assets/_next/data/dX3EgTGxuE9nkX1iYmSx6/user/${username}.json`;
    const response = await axios.get(url);

    const currentRating =
      response.data?.pageProps?.contestData?.user_contest_data?.current_rating;

    return currentRating || "Unrated";
  } catch (error) {
    console.error(error);
    return "Error fetching GFG rating";
  }
};

module.exports = { getGfgRating };
