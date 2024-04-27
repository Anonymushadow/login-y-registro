const jwt = require('jsonwebtoken');
const EWCThrowError = require("../modules/EWC-modules/ErrorHandlers/EWC-ThrowErrors");

function isLoggedIn(req, res, next) {
    if (req.cookies.accessTokenUser) {
        return next();
    } else {
        res.render("pages/login", { rol: "" });
        return;
    }
}

function checkRole(role) {
    return function (req, res, next) {
        try {
            const accessToken = req.cookies.accessTokenUser;
            if (!accessToken) {
                return res.render('pages/login', { rol: "" });
            }

            const decodedToken = jwt.verify(accessToken, process.env.SECRET_KEY);
            const userRole = decodedToken.rol;

            let allowed = false;

            role.forEach(rol => {
                if (userRole === rol) {
                    allowed = true;
                }
            })

            if (allowed) {
                return next();
            } else {
                return res.render('pages/home', { rol: "" });
            }
        } catch (error) {
            console.error('Error al verificar token de acceso:', error);
            return res.status(500).json({ error: 'Error al verificar token de acceso' });
        }
    };
}


module.exports = {
    isLoggedIn,
    checkRole
}



