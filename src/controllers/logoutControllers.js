const EWCLogout = require("../modules/EWC-modules/Auth/EWC-Logout"); 
const EWCThrowError = require("../modules/EWC-modules/ErrorHandlers/EWC-ThrowErrors");
const getUserData = require("../modules/other modules/obtenerCookie");

const logout = async (req, res)=> {
    try{
        const sesion = await EWCLogout(res, "accessTokenUser", "refreshTokenUser");

        EWCThrowError(sesion.status !== 200, sesion.message);
        
        res.status(200).send(sesion.content);
    }catch(error){
        res.status(500).send(error.message);
    }
}

module.exports = {
    logout
};