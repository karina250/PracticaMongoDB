const { response } = require('express');
const Aula = require('../models/aulaModel');

const getAula = async(req, res = response) => {

    const aula = await Aula.find().populate('usuario', 'nombre');

    res.json({
        ok: true,
        aula
    });
}
const crearAula = async(req, res = response) => {
    const uid = req.uid;

    const aula = new Aula({
        usuario: uid,
        ...req.body
    });

    try {

        const aulaDB = await aula.save();
        res.json({
            ok: true,
            aula: aulaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado'
        });
    }


}
const actualizarAula = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const aula = await Aula.findById(id);
        if (!aula) {
            return res.status(404).json({
                ok: true,
                msg: 'Aula no existe'

            });
        }

        const cambiosAula = {
            ...req.body,
            usuario: uid
        }

        const aulaActualizado = await Aula.findByIdAndUpdate(id, cambiosAula, { new: true });

        return res.json({
            ok: true,
            aula: aulaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarAula = async(req, res = response) => {
    const id = req.params.id;

    try {

        const aula = await Aula.findById(id);
        if (!aula) {
            return res.status(404).json({
                ok: true,
                msg: 'aula no existe'

            });
        }

        await Aula.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Aula Eliminada'

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
    getAula,
    crearAula,
    actualizarAula,
    eliminarAula
}