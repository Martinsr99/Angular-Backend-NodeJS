const { Router } = require("express");

const {
  getMedicos,
  crearMedico,
  borrarMedico,
  actualizarMedico,
} = require("../controllers/medicos");
const validarJWT = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getMedicos);
router.post("/",[validarJWT,check('nombre','El nombre del medico es necesario').not().isEmpty(),check('hospital','El hospitalId debe de ser válido').isMongoId(),validarCampos] ,crearMedico);
router.put("/:id", actualizarMedico);
router.delete("/:id", borrarMedico);

module.exports = router;
