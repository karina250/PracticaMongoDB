const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const CursoSchema = Schema({
    nombreCurso: {
        type: String,
        required: true
    },
    profesor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Profesor'
    },
    cantidadAlumnos: {
        type: Number,
        required: true
    },
    aula: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Aula'
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },


});

CursoSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Curso', CursoSchema);