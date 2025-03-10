const axios = require("axios");

const getLeetcodeRating = async (username) => {
  const url = "https://leetcode.com/graphql";
  try {
    const payload = {
      query: `
        query getUserContestRanking($username: String!) {
          userContestRanking(username: $username) {
            rating,
            attendedContestsCount
          }
        }`,
      variables: { username },
    };

    const response = await axios.post(url, payload);
    const rating = parseInt(response.data.data.userContestRanking?.rating);
    const contests_participated = parseInt(
      response.data.data.userContestRanking?.attendedContestsCount
    );
    return rating
      ? {
          username: username,
          platform: "leetcode",
          rating,
          contests_participated,
          level: "newbie",
        }
      : { error: "Error fetching LeetCode rating" };
  } catch {
    return { error: "Error fetching LeetCode rating" };
  }
};

getLeetcodeRating("anujjoshi3105").then(console.log).catch(console.error);
module.exports = { getLeetcodeRating };
