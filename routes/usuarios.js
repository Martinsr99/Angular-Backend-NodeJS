const { Router } = require("express");
const {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  updateUsuario,
  borrarUsuario
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  "/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validarCampos,
  ],
  updateUsuario
);

router.delete("/:id", borrarUsuario);
module.exports = router;
