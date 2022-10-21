const { fork } = require("child_process");

const GetRandomNumbers = async (req, res, next) => {
  try {
    let { cant } = req.query;
    const randomNumber = fork("./helpers/generateRandomNumber.js", [cant]);
    randomNumber.send("start");
    randomNumber.on("message", (obj) => res.json(obj));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetRandomNumbers,
};
