const pool = require("../modules/EWC-modules/Database/EWC-Pool");
const logearUsuario = require("../modules/EWC-modules/Auth/EWC-Login");
const EWCThrowError = require("../modules/EWC-modules/ErrorHandlers/EWC-ThrowErrors");
const getUserData = require("../modules/other modules/obtenerCookie");

const login = (req, res)=> {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    res.render("pages/login", { rol });
}

const loginPost = async (req, res) => {
    try {
        const login = await logearUsuario(res, req, pool, "users", "user", "password");
        
        EWCThrowError(login.status !== 200, login.message);

        res.status(200).send(login.content);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    login,
    loginPost
}