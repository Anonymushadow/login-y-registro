const jwt = require('jsonwebtoken');

function getUserData(req, cookieName) {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
        return null;
    }

    try {
        const decodedData = jwt.verify(cookieValue, process.env.SECRET_KEY);
        return decodedData; 
    } catch (error) {
        console.error('Error al decodificar la cookie:', error);
        return null; 
    }
}

module.exports = getUserData;
