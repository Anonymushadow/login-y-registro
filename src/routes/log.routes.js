const express = require("express");
const loginControllers = require("../controllers/login.controllers");
const registerControllers = require("../controllers/register.controllers");
const logoutControllers = require("../controllers/logoutControllers");

const route = express.Router();

route.get("/login", loginControllers.login);

route.post("/login", loginControllers.loginPost);

route.get("/register", registerControllers.register);

route.post("/register", registerControllers.registerPost);

route.get("/logout", logoutControllers.logout);

module.exports = route;