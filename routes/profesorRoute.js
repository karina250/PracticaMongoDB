/*
    Proyectos
    ruta: /api/profesor
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getProfesor, actualizarProfesor, eliminarProfesor, crearProfesor } = require('../controllers/profesorController');


const router = Router();

router.get('/', getProfesor);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del alumno es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearProfesor);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alumno es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProfesor);

router.delete('/:id',
    validarJWT,
    eliminarProfesor);



module.exports = router; //para exportar