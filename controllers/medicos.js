const Medico = require("../models/medico")


const getMedicos = async(req,res) => {

    const medicos = await Medico.find().populate('usuario','nombre img').populate('hospital','nombre')


    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async(req,res) => {

    const uid = req.uid
    medico = new Medico({usuario:uid,...req.body})

    try {
        const medicoDB = await medico.save()

        res.json({
            ok:true,
            medicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error creando medico'
        })
    }
}

const actualizarMedico = (req,res) => {
    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}

const borrarMedico = (req,res) => {
    res.json({
        ok:true,
        msg:'borrarMedico'
    })
}
module.exports = {getMedicos,crearMedico,borrarMedico,actualizarMedico};