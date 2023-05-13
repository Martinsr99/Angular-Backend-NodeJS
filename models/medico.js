const {Schema,model} = require('mongoose')


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img:{
        type:String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    }
})

MedicoSchema.method('toJSON', function(){
    const {__v,...object} = this.toObject()
    return object
})

module.exports = model('Medico',MedicoSchema)