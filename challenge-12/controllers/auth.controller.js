const Login = async (req, res, next) => {
  try {
    const { username } = req.body;

    req.session.username = username;

    if (username.trim() === "") {
      res.status(400).json({
        data: "",
        success: false,
        message: "Debes ingresar un usuario válido",
      });
    } else {
      res.status(200).json({
        data: "admin-token",
        success: true,
        message: `Bienvenido de nuevo ${username}!`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  try {
    const { username } = req.session;
    if (username) {
      req.session.destroy((err) => {
        console.log(err);
        if (err) {
          res.status(401).json({
            data: "",
            success: false,
            message: `No has iniciado sesión, o la misma ha vencido. Por favor, inicia sesión nuevamente.`,
          });
        } else {
          res.status(200).json({
            data: "",
            success: true,
            message: `Hasta luego ${username}!`,
          });
        }
      });
    } else {
      res.status(401).json({
        data: "",
        success: false,
        message: `No has iniciado sesión.`,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { Login, Logout };
