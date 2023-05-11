const { generarJWT } = require("../helpers/jwt");
const usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const getUsuarios = async (req, res) => {
  const usuarios = await usuario.find();

  res.json({
    ok: true,
    usuarios,
    uid: req.uid
  });
};

const getUsuarioById = async (req, res) => {
  const usuarioById = await usuario.findById(req.params.id);

  res.json({
    ok: true,
    usuarioById,
  });
};

const borrarUsuario = async (req, res) => {
  try {
    const existingUser = await usuario.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await usuario.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(500).json({
      msg: "No se pudo borrar el usuario",
      ok: false,
    });
  }

  res.json({
    ok: true,
    msg: "Usuario borrado",
  });
};

const crearUsuario = async (req, res) => {
  const { email, name, password } = req.body;
  const existingUser = await usuario.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const usuarioNuevo = new usuario(req.body);

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuarioNuevo.password = bcrypt.hashSync(String(password), salt);

  //Guardar usuario
  await usuarioNuevo.save();

  const token = await generarJWT(usuario.id)

  res.json({ ok: true, usuarioNuevo,token });
};

const updateUsuario = async (req, res) => {
  const { password, google, email, ...campos } = req.body;

  uid = req.params.id;

  const existingUser = await usuario.findById(uid);
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (existingUser.email !== email) {
    const existeEmail = await usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }
  }

  campos.email = email;

  const usuarioActualizado = await usuario.findByIdAndUpdate(uid, campos, {
    new: true,
  });

  res.json({ ok: true, usuarioActualizado });
};

module.exports = {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  updateUsuario,
  borrarUsuario,
};
