const { response } = require("express");
const usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const googleVerify = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Check email
    const usuarioDB = await usuario.findOne({ email });

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
    res.json({
      ok: true,
      name,
      email,
      picture,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Token de google incorrecto",
    });
  }
};

module.exports = { login, googleSignIn };
