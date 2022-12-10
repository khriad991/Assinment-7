const express = require("express");
const profileModel = require("../controller/profileController");

const router = express.Router();

router.post("/registration", profileModel.registration);
router.get("/login", profileModel.login)
router.get('/changePassword',profileModel.changePassword)

module.exports = router;
