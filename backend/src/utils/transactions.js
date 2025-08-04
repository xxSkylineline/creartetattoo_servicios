const conectionDB = require("../config/connections");
const bcrypt = require("bcrypt");
const saltosHash = 10; // Asegúrate de que sea un número (no string)

const createUser = async (userData) => {
    // 1. Validación de campos obligatorios
    if (!userData.contrasena) {
        throw new Error("La contraseña es requerida");
    }

    // 2. Hashear la contraseña (con manejo de errores)
    let pwdHash;
    try {
        pwdHash = await bcrypt.hash(userData.contrasena, saltosHash);
    } catch (error) {
        throw new Error("Error al hashear la contraseña: " + error.message);
    }

    // 3. Query parametrizada (¡EVITA SQL INJECTION!)
    const query = `INSERT INTO USUARIOS (nombre, apellido, email, contraseña, direccion) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await conectionDB.query(query, [
        userData.nombre,
        userData.apellido,
        userData.email,
        pwdHash,
        userData.direccion
    ]);

    return result;
};

module.exports = {
    createUser
};