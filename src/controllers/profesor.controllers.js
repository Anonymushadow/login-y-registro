const getUserData = require("../modules/other modules/obtenerCookie");

const profesor = (req, res)=> {
    const user = getUserData(req, "accessTokenUser");
    const rol = user ? user.rol : "";
    console.log(user);
    console.log(rol);
    res.render("pages/profesor", { rol });
}

module.exports = {
    profesor
}