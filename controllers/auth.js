const {response} = require('express')
const usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const login = async (req, res=response) => {

    const {email,password} = req.body

    try {
        //Check email
        const usuarioDB = await usuario.findOne({email})

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            })
        }
        
        //Check password
        const validPassword = bcrypt.compareSync(String(password),usuarioDB.password)
        if(!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Contraseña errónea'
            })
        }

        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error en el login'
        })
    }
}

const googleSignIn = (req, res) => {
    
            res.json({
                ok:true,
                msg: req.body.token
            })

}

module.exports = {login,googleSignIn}