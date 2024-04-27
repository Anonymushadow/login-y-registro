const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const EWCAccessToken = require("./EWC-AccessToken");
const EWCMysql = require("../Database/EWC-Mysql");
const EWCThrowError = require("../ErrorHandlers/EWC-ThrowErrors");

async function iniciarSesion(res, req, pool, tabla, campoMail, campoContraseña) {
  return new Promise(async (resolve, reject) => {
    try {
      const { user, password } = req.body;
      
      // Verificamos si el usuario existe
      const usuarioExistente = await EWCMysql.obtenerDato(pool, tabla, campoMail, user);

      EWCThrowError(usuarioExistente.status !== 200, "Error del servidor");

      EWCThrowError(usuarioExistente.content.length === 0, "Usuario no encontrado");

      const userDB = usuarioExistente.content[0];
      // Comparamos la contraseña ingresada con la encriptada (actual, encriptada)
      const contraseñaValida = await bcrypt.compare(
        password,
        userDB[campoContraseña]
      );

      EWCThrowError(!contraseñaValida, "Contraseña incorrecta");

      const userDataWithoutPassword = { ...userDB };
      delete userDataWithoutPassword.password;

      // Generar token de acceso y obtenemos uno de refresco
      const refreshToken = await EWCAccessToken(res, userDB);

      EWCThrowError(refreshToken.status !== 200, "Error del servidor");
      
      resolve({
        status: 200,
        content: `Bienvenido/a ${user}`
      });
    } catch (error) {
      let errorMessage = "Error del servidor";
      if (error.message === "Contraseña incorrecta" || error.message === "Usuario no encontrado" || error.message === "Contraseña no puede estar vacía") {
        errorMessage = error.message;
      }
      reject({
        status: 500,
        message: errorMessage
      });
    }
  });
}

module.exports = iniciarSesion;
