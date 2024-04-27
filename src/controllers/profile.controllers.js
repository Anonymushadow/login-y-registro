const getUserData = require("../modules/other modules/obtenerCookie");

const profile = (req, res) => {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    res.render('pages/profile', { rol });
};

module.exports = {
    profile
}