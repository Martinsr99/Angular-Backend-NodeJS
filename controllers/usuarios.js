const usuario = require("../models/usuario")


const getUsuarios = async(req,res) =>{

    const usuarios = await usuario.find()

    res.json({
        ok:true,
        usuarios
    })
}

const crearUsuario = async(req, res) =>{
    const {email,name,password} = req.body

    const usuarioNuevo = new usuario(req.body)


    await usuarioNuevo.save()

    res.json({ok:true,usuarioNuevo})

}

module.exports = {getUsuarios,crearUsuario}