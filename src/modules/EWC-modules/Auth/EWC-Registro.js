const EWCMysql = require("../Database/EWC-Mysql");
const EWCThrowError = require("../ErrorHandlers/EWC-ThrowErrors");
const EWCAccessToken = require("./EWC-AccessToken");
const EWCEncriptar = require("./EWC-Encriptar");

async function registrarUsuario(res, pool, userClearData, userData, tableName, userColumnName) {
  return new Promise(async (resolve, reject) => {
    try {
      // Buscamos al usuario en la base de datos
      const userExists = await EWCMysql.obtenerDato(pool, tableName, userColumnName, userData.user);

      // Verificamos si hay un error al buscar el usuario en la base de datos
      EWCThrowError(userExists.status !== 200, "Error al buscar el usuario en la base de datos");

      // Verificamos si el usuario ya existe
      EWCThrowError(userExists.content.length > 0, `El usuario ${userData.user} ya existe`);

      // Encriptamos la contraseña del usuario antes de almacenarla
      const hashedPassword = await EWCEncriptar(userData.password);

      // Verificamos si hubo un error en la encriptación de la contraseña
      EWCThrowError(hashedPassword.status !== 200, hashedPassword.message);

      // Actualizamos la contraseña en los datos del usuario
      userData.password = hashedPassword.content;

      // Almacenamos el usuario en la base de datos
      const añadirDatoResultado = await EWCMysql.añadirDato(pool, tableName, Object.keys(userData), Object.values(userData));

      // Verificamos si hay errores al añadir los datos a la base de datos
      EWCThrowError(añadirDatoResultado.status !== 200, "Error al registrar al usuario en la base de datos");

      // Generamos y devolvemos el token de actualización
      const refreshToken = await EWCAccessToken(res, userClearData);

      EWCThrowError(refreshToken.status !== 200, refreshToken.message);

      resolve({
        status: 200,
        content: `Bienvenido/a ${userData.user}`
      });
    } catch (error) {
      let errorMessage = "Error del servidor";
      if (error.message === `El usuario ${userData.user} ya existe` || error.message === "Contraseña no puede estar vacía") {
        errorMessage = error.message;
      }
      reject({
        status: 500,
        message: errorMessage
      });
    }
  });
}

module.exports = registrarUsuario;
