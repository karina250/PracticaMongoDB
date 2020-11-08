/*
    Proyectos
    ruta: /api/curso
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
} = require('../controllers/cursoController');


const router = Router();

router.get('/', getCurso);


router.post('/', [
        validarJWT,
        //check('nombre', 'El nombre del Curso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCurso);

router.put('/:id', [
        validarJWT,
        //check('nombre', 'El nombre del Curso es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCurso);


router.delete('/:id',
    validarJWT,
    eliminarCurso);



module.exports = router; //para exportar