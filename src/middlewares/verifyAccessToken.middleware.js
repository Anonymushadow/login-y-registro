const jwt = require('jsonwebtoken');

const updateTokensMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessTokenUser;
        const refreshToken = req.cookies.refreshTokenUser;

        if (!accessToken) {
            res.render("pages/login", { rol: "" });
            return;
        }

        // Decodificar el accessToken para verificar su validez
        jwt.verify(accessToken, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                // Si el accessToken ha expirado, verificar el refreshToken
                jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decodedRefreshToken) => {
                    if (err) {
                        // Si el refreshToken también ha expirado o es inválido, redirigir a iniciar sesión
                        res.render("pages/login", { rol: "" });
                        return;
                    }

                    // Generar nuevos tokens
                    const newAccessToken = jwt.sign(decodedRefreshToken, process.env.SECRET_KEY, { expiresIn: '1h' });
                    const newRefreshToken = jwt.sign(decodedRefreshToken, process.env.SECRET_KEY, { expiresIn: '30d' });

                    // Actualizar las cookies con los nuevos tokens
                    res.cookie('accessTokenUser', newAccessToken, { httpOnly: true });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 86400000 });
                    // Continuar con la solicitud
                    next();
                });
            } else {
                // Si el accessToken es válido, continuar con la solicitud
                next();
            }
        });
    } catch (error) {
        res.render("pages/login", { rol: "" });   
        return;     
    }
};

module.exports = updateTokensMiddleware;
