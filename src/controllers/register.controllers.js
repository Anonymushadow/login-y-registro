const pool = require("../modules/EWC-modules/Database/EWC-Pool");
const registrarUsuario = require("../modules/EWC-modules/Auth/EWC-Registro");
const EWCThrowError = require("../modules/EWC-modules/ErrorHandlers/EWC-ThrowErrors");
const getUserData = require("../modules/other modules/obtenerCookie");

const register = (req, res) => {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    res.render("pages/register", { rol });
}

const registerPost = async (req, res) => {
    try {
        const data = req.body;

        const registro = await registrarUsuario(res, pool, data.userClearData, data.userData, "users", "user");
        
        EWCThrowError(registro.status !== 200, registro.message);

        res.status(200).send(registro.content);
    }catch(err){
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

module.exports = {
    register,
    registerPost
}