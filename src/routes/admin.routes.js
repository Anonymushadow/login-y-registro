const express = require("express");
const controllers = require("../controllers/admin.controllers.js");
const accessTokenValidator = require("../middlewares/verifyAccessToken.middleware.js");
const logValidator = require("../middlewares/allowed.middleware.js");

const route = express.Router();

route.get("/admin", accessTokenValidator, logValidator.isLoggedIn, logValidator.checkRole(["admin"]), controllers.admin);

module.exports = route;