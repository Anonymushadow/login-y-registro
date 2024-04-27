const jwt = require('jsonwebtoken');

//accessTokenUser
//refreshAccessTokenUser
function logout(res, cookieToken="accessToken", refreshToken=null) {
  return new Promise((resolve, reject) => {
    try {
      // Eliminamos la cookie de acceso 
      res.clearCookie(cookieToken);

      // Si se proporciona un refreshToken y existe en las cookies, también lo eliminamos
      if (refreshToken) {
        res.clearCookie(refreshToken);
      }

      resolve({
        status: 200, 
        content: 'Sesión cerrada exitosamente' 
      });
    } catch (error) {
      reject({
        status: 500,
        message: 'Ocurrió un error al cerrar sesión'
      });
    }
  });
}

module.exports = logout;
