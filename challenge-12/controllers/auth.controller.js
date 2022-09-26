const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username === "admin" && password === "admin")) {
      res.status(401).json({
        message: "User or password incorrect",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        token: "admin-token",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { Login };
