const router = require("express").Router();
const compression = require("compression");
const { GetProyectInfo } = require("../controllers/env.controller");

router.get("/info", compression(), GetProyectInfo);

module.exports = router;
