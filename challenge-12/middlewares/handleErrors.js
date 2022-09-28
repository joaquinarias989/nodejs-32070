module.exports = (error, req, res, next) => {
  console.log(error);
  if (error.toString().includes("CastError"))
    res.status(400).json({ error: "Invalid ID" });
  else
    res.status(500).json({ error: "Something went wrong. Please, try again" });
};
