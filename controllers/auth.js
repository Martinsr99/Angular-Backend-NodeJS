const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const googleVerify = require("../helpers/google-verify");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Check email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    //Check password
    const validPassword = bcrypt.compareSync(
      String(password),
      usuarioDB.password
    );
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña errónea",
      });
    }

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(usuarioDB.role)

    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error en el login",
    });
  }
};

const googleSignIn = async (req, res) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDB = await Usuario.findOne({ email})
    let usuario;

    if(!usuarioDB){
      usuario = new Usuario({
        nombre:name,
        email,
        password:'@@@',
        img:picture,
        google:true
      })
    } else{
      usuario = usuarioDB
      usuario.google = true
    }

    //Guardar usuario
    await usuario.save()

    //Generar token
    const token = await generarJWT(usuario.id)

    res.json({
      ok: true,
      name,
      email,
      token,
      picture,
      menu:getMenuFrontEnd(usuario.role)
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Token de google incorrecto",
    });
  }
};

const renewToken = async(req,res) => {

  const uid = req.uid

  //Generar token
  const token = await generarJWT(uid)

  //Obtener usuario por UID
  const usuario = await Usuario.findById(uid)

  res.json({
    ok:true,
    token,
    usuario,
    menu:getMenuFrontEnd(usuario.role)
  })

}

module.exports = { login, googleSignIn,renewToken };
