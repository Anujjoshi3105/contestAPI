const axios = require("axios");

const getLeetcodeRating = async (username) => {
  try {
    const url = "https://leetcode.com/graphql";
    const payload = {
      query: `
        query getUserContestRanking($username: String!) {
          userContestRanking(username: $username) {
            rating
          }
        }`,
      variables: { username },
    };

    const response = await axios.post(url, payload);
    const rating = parseInt(response.data.data.userContestRanking?.rating);
    return rating
      ? { rating, level: "newbie" }
      : "Error fetching LeetCode rating";
  } catch {
    return "Error fetching LeetCode rating";
  }
};

module.exports = { getLeetcodeRating };
