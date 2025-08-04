const express = require('express');
const {createUser} = require('../utils/transactions');

const router = express.Router();

router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, direccion } = req.body;

    if (!nombre || !email || !contrasena) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const userId = await createUser({ nombre, apellido, email, contrasena, direccion });
    res.status(201).json({ id: userId, message: 'Usuario creado exitosamente' });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'El email ya está registrado' });
    } else {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

module.exports = router;