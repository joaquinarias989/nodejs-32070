module.exports = (error, req, res, next) => {
  if (error.name === "CastError") res.status(400).json({ error: "Invalid ID" });
  else
    res.status(500).json({ error: "Something went wrong. Please, try again" });
};
