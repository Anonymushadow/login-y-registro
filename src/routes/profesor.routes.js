const express = require("express");
const controllers = require("../controllers/profesor.controllers");
const accessTokenValidator = require("../middlewares/verifyAccessToken.middleware");
const logValidator = require("../middlewares/allowed.middleware");

const route = express.Router();

//logValidator.checkRole("teacher") --> ACA DEBE VERIFICAR SI ES TEACHER O ADMIN, SOLO VERIFICA TEACHER Y AL SER ADMIN TIRA ERROR
route.get("/profesor", accessTokenValidator, logValidator.isLoggedIn, logValidator.checkRole(["teacher", "admin"]), controllers.profesor);

module.exports = route;