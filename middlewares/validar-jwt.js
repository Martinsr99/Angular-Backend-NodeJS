const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({
      msg: "Token missing",
      ok: false,
    });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
  } catch (error) {
    return res.status(401).json({
      msg: "Token invalid",
      ok: false,
    });
  }

  next();
};

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    }else{
        return res.status(403).json({
          ok: false,
          msg: "No dispone de permisos para esta acción",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error de permisos, contacte al administrador",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE_o_MismoUsuario,
};
