const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const AulaSchema = Schema({
    nombreAula: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

AulaSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Aula', AulaSchema);