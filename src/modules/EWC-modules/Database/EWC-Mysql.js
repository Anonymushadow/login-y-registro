// Función para manejar errores de consulta
function ejecutarConsulta(pool, consulta) {
  return new Promise((resolve, reject) => {
    pool.query(consulta, (err, data) => {
      if (err) {
        reject({
          status: 500,
          message: err
        });
      } else {
        resolve({
          status: 200,
          content: data
        });
      }
    });
  });
}

// Obtener todos los datos de una tabla
function obtenerDatos(pool, tabla) {
  const consulta = `SELECT * FROM ${tabla}`;
  return ejecutarConsulta(pool, consulta);
}

// Obtener datos filtrados
function obtenerDato(pool, tabla, campo, valor) {
  const consulta = `SELECT * FROM ${tabla} WHERE ${campo} = '${valor}'`;
  return ejecutarConsulta(pool, consulta);
}

// Eliminar dato
function eliminarDato(pool, tabla, campo, valor) {
  const consulta = `DELETE FROM ${tabla} WHERE ${campo} = '${valor}'`;
  return ejecutarConsulta(pool, consulta);
}

// Añadir dato
function añadirDato(pool, tabla, columnas, datos) {
  // Combinamos los elementos del array en una cadena de texto separada por comas y un espacio
  const columnasStr = columnas.join(', ');
  // Cconvertimos los datos en una cadena de texto única que puede ser utilizada en la consulta SQL
  const datosStr = datos.map(dato => `'${dato}'`).join(', ');
  const consulta = `INSERT INTO ${tabla} (${columnasStr}) VALUES (${datosStr})`;
  return ejecutarConsulta(pool, consulta);
}

// Modificar dato
function modificarDato(pool, tabla, campo, valor, columnas, datos) {
  // Unificamos las columnas y datos en un solo string quedando "clave = valor, clave = valor..."
  const actualizaciones = columnas.map((columna, index) => `${columna} = '${datos[index]}'`).join(', ');
  const consulta = `UPDATE ${tabla} SET ${actualizaciones} WHERE ${campo} = '${valor}'`;
  return ejecutarConsulta(pool, consulta);
}

module.exports = {
  obtenerDatos,
  obtenerDato,
  eliminarDato,
  añadirDato,
  modificarDato
};
