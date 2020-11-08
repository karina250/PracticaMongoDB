const { response } = require('express');
const Curso = require('../models/cursoModel');

const getCurso = async(req, res = response) => {

    const curso = await Curso.find().populate('usuario', 'nombre').populate('profesor', 'nombre apellido').populate('aula', 'nombre');


    res.json({
        ok: true,
        curso
    });
}
const crearCurso = async(req, res = response) => {
    const uid = req.uid;

    const curso = new Curso({
        usuario: uid,
        ...req.body
    });

    try {

        const cursoDB = await curso.save();
        res.json({
            ok: true,
            curso: cursoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado'
        });
    }


}
const actualizarCurso = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'Curso no existe'

            });
        }

        const cambiosCurso = {
            ...req.body,
            usuario: uid
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, cambiosCurso, { new: true });

        return res.json({
            ok: true,
            curso: cursoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarCurso = async(req, res = response) => {
    const id = req.params.id;

    try {

        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({
                ok: true,
                msg: 'curso no existe'

            });
        }

        await Curso.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Curso Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

module.exports = {
    getCurso,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}