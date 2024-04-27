const jwt = require("jsonwebtoken");
const EWCThrowError = require("../ErrorHandlers/EWC-ThrowErrors");
require('dotenv').config();

function crearTokens(res, userData, accessExpiresIn = "1h", refreshExpiresIn = "30d") {
  return new Promise(async (resolve, reject) => {
    try {
      // ¿Existe el usuario? => si = continuamos | no = rechazamos
      EWCThrowError(typeof userData !== "object" || !userData, "Datos de inicio invalidos");

      // Obtenemos la clave para firmar los tokens y verificamos que se cree bien
      const secretKey = process.env.SECRET_KEY;

      EWCThrowError(!secretKey, "El secret key es invalido");

      // Firmamos un token de acceso
      jwt.sign(userData, secretKey, { expiresIn: accessExpiresIn }, async (err, accessToken) => {
        EWCThrowError(err, "Error al firmar el token");

        // Firmamos el token de refresco
        const refreshToken = jwt.sign(userData, secretKey, { expiresIn: refreshExpiresIn });
        
        EWCThrowError(!refreshToken, "Error al crear el token de refresco");

        // Añadimos el token de acceso y de refresco a las cookies
        res.cookie("accessTokenUser", accessToken, { httpOnly: true });
        res.cookie("refreshTokenUser", refreshToken, { httpOnly: true });

        resolve({
          status: 200,
          content: null
        });

      })

    } catch (error) {
      reject({
        status: 500,
        message: error
      })
    }
  })
}

module.exports = crearTokens;