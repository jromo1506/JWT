const express = require('express');
const router = express.Router();

// Middleware
const verificarJWT = require('../middleware/jwtAuth.js');

//Controllers
const usuarioController =  require('../controllers/usuarioController.js');
const authController = require('../controllers/authController.js');


router.get('/usuario',usuarioController.obtenerUsuarios);
router.post('/usuario',usuarioController.anadirUsuario);
router.put('/usuario/:id',usuarioController.modificarUsuario);
router.delete('/usuario',verificarJWT,usuarioController.eliminarUsuario);
router.get('/usuario/:id',verificarJWT,usuarioController.obtenerUsuarioPorId);

router.post('/login',authController.login);
router.post('/refresh',authController.refresh);
router.post('/logout',verificarJWT,authController.logout);


module.exports = router