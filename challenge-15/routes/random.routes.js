const router = require("express").Router();
const { GetRandomNumbers } = require("../controllers/random.controller");

router.get("/", GetRandomNumbers);

module.exports = router;
