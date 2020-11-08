const { response } = require('express');
const Profesor = require('../models/profesorModel');

const getProfesor = async(req, res = response) => {

    const profesor = await Profesor.find().populate('usuario', 'nombre apellido');

    res.json({
        ok: true,
        profesor
    });
}
const crearProfesor = async(req, res = response) => {
    const uid = req.uid;

    const profesor = new Profesor({
        usuario: uid,
        ...req.body
    });

    try {

        const profesorDB = await profesor.save();
        res.json({
            ok: true,
            profesor: profesorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado'
        });
    }


}
const actualizarProfesor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.status(404).json({
                ok: true,
                msg: 'Profesor no existe'

            });
        }

        const cambiosProfesor = {
            ...req.body,
            usuario: uid
        }

        const profesorActualizado = await Profesor.findByIdAndUpdate(id, cambiosProfesor, { new: true });

        return res.json({
            ok: true,
            profesor: profesorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarProfesor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.status(404).json({
                ok: true,
                msg: 'profesor no existe'

            });
        }

        await Profesor.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Profesor Eliminado'

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
    getProfesor,
    crearProfesor,
    actualizarProfesor,
    eliminarProfesor
}