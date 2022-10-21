const router = require("express").Router();
const { GetProyectInfo } = require("../controllers/env.controller");

router.get("/info", GetProyectInfo);

module.exports = router;
