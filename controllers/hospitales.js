

const getHospitales = (req,res) => {
    res.json({
        ok:true,
        msg:'getHospitales'
    })
}

const crearHospital = (req,res) => {
    res.json({
        ok:true,
        msg:'crearHospital'
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