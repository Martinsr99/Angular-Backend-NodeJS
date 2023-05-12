

const getMedicos = (req,res) => {
    res.json({
        ok:true,
        msg:'getMedicos'
    })
}

const crearMedico = (req,res) => {
    res.json({
        ok:true,
        msg:'crearMedico'
    })
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