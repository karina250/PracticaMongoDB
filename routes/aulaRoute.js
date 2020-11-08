/*
    Proyectos
    ruta: /api/aula
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getAula, crearAula, actualizarAula, eliminarAula } = require('../controllers/aulaController');


const router = Router();

router.get('/', getAula);

router.post('/', [
        validarJWT,
        //check('nombreAula', 'El nombre del aula es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAula);


router.put('/:id', [
        validarJWT,
        //scheck('nombreAula', 'El nombre del aula es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarAula);

router.delete('/:id',
    validarJWT,
    eliminarAula);



module.exports = router; //para exportar