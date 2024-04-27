const throwError = (verificacion, mensaje)=> {
    if(verificacion){
        throw new Error(mensaje);
    }
}

module.exports = throwError;