const express = require("express");
const router = express.Router();
const controllers = require("../controllers/profile.controllers.js");
const accessTokenValidator = require("../middlewares/verifyAccessToken.middleware.js");
const logValidator = require("../middlewares/allowed.middleware.js");

router.get("/my-profile", accessTokenValidator, logValidator.isLoggedIn, controllers.profile);

module.exports = router;