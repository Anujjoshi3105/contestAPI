const axios = require("axios");
const cheerio = require("cheerio");

const getGfgRating = async (username) => {
  const url = `https://www.geeksforgeeks.org/user/${username}/`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const scriptContent = $("script#__NEXT_DATA__").html();
    if (!scriptContent)
      return { error: "User not found or invalid profile page." };

    const jsonData = JSON.parse(scriptContent);
    const userData = jsonData?.props?.pageProps?.contestData?.user_contest_data;
    const stars = jsonData?.props?.pageProps?.contestData?.user_stars;

    return userData
      ? {
          username: username,
          platform: "gfg",
          rating: userData.current_rating || "Unrated",
          level: stars ? `${stars} star` : "Unrated",
        }
      : {
          error: "Error fetching GFG user data. Check valid username.",
        };
  } catch (error) {
    return {
      error: "Error fetching GFG user data. Check username or network.",
    };
  }
};

getGfgRating("anujjoshi31").then(console.log).catch(console.error);

module.exports = { getGfgRating };
