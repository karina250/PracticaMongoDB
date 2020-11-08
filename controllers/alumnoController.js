const { response } = require('express');
const Alumno = require('../models/alumnoModel');

const getAlumno = async(req, res = response) => {

    const alumno = await Alumno.find().populate('usuario', 'nombre apellido');


    res.json({
        ok: true,
        alumno
    });
}
const crearAlumno = async(req, res = response) => {
    const uid = req.uid;

    const alumno = new Alumno({
        usuario: uid,
        ...req.body
    });

    try {

        const alumnoDB = await alumno.save();
        res.json({
            ok: true,
            alumno: alumnoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado'
        });
    }


}
const actualizarAlumno = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no existe'

            });
        }

        const cambiosAlumno = {
            ...req.body,
            usuario: uid
        }

        const alumnoActualizado = await Alumno.findByIdAndUpdate(id, cambiosAlumno, { new: true });

        return res.json({
            ok: true,
            alumno: alumnoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarAlumno = async(req, res = response) => {
    const id = req.params.id;

    try {

        const alumno = await Alumno.findById(id);
        if (!alumno) {
            return res.status(404).json({
                ok: true,
                msg: 'alumno no existe'

            });
        }

        await Alumno.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Alumno Eliminado'

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
    getAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}