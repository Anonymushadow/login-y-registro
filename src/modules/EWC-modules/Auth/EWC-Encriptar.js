const bcrypt = require('bcrypt');
const EWCThrowError = require("../ErrorHandlers/EWC-ThrowErrors");

// Función para hashear la contraseña y devolverla
function hashPassword(password, salt) {
  return bcrypt.hashSync(password, salt);
}

async function encriptarUsuario(userPassword) {
  return new Promise(async (resolve, reject)=> {
    try {
      // Generamos una clave para encriptar la contraseña (se reencripta 10 veces)
      const salt = await bcrypt.genSalt(10);

      // Encriptamos la contraseña 
      const hashedPassword = hashPassword(userPassword, salt);
      EWCThrowError(!hashedPassword, "Error al encriptar la clave. La contraseña no puede estar vacía.");

      // Resolvemos con la clave encriptada
      resolve({
        status: 200,
        content: hashedPassword
      })
    }catch (error){
      reject({
        status: 500,
        message: error
      })
    }
  })
}

module.exports = encriptarUsuario;