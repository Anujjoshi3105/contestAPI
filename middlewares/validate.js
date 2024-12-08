const validateUsername = (req, res, next) => {
  const { username } = req.query;
  if (!username || typeof username !== "string" || username.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing username" });
  }
  req.username = username.trim();
  next();
};

module.exports = validateUsername;
