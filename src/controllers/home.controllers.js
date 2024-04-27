const getUserData = require("../modules/other modules/obtenerCookie");

const index = (req, res) => {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    res.render("pages/home", { rol });
}

module.exports = {
    index
}