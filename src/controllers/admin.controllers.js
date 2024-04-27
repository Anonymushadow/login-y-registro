const getUserData = require("../modules/other modules/obtenerCookie");

const admin = async (req, res)=> {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    res.render("pages/admin", { rol });
}

module.exports = {
    admin
}