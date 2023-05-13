const Hospital = require('../models/hospital')

const getHospitales = async(req,res) => {
    
    const hospitales = await Hospital.find().populate('usuario','nombre img')
    
    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital = async(req,res) => {

    const uid = req.uid
    const hospital = new Hospital({usuario:uid,...req.body})
    

    try {
        hospitalDB = await hospital.save()
    } catch (error) {
        res.status(500).json({
            msg:'Error creando hospital',
            ok:false
        })
    }

    res.json({
        ok:true,
        hospitalDB
    })
}

const actualizarHospital = (req,res) => {
    res.json({
        ok:true,
        msg:'actualizarHospital'
    })
}

const borrarHospital = (req,res) => {
    res.json({
        ok:true,
        msg:'borrarHospital'
    })
}
module.exports = {getHospitales,crearHospital,borrarHospital,actualizarHospital};