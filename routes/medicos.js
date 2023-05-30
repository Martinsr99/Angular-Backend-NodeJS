const { Router } = require("express");

const {
  getMedicos,
  crearMedico,
  borrarMedico,
  actualizarMedico,
  getMedicoById
} = require("../controllers/medicos");
const {validarJWT} = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", getMedicos);
router.post("/",[validarJWT,check('nombre','El nombre del medico es necesario').not().isEmpty(),check('hospital','El hospitalId debe de ser válido').isMongoId(),validarCampos] ,crearMedico);
router.put("/:id",[validarJWT,check('nombre','El nombre del medico es necesario').not().isEmpty(),check('hospital','El hospitalId debe de ser válido').isMongoId(),validarCampos] , actualizarMedico);
router.delete("/:id",[validarJWT,check('hospital','El hospitalId debe de ser válido').isMongoId(),validarCampos],borrarMedico);
router.get("/:id",[validarJWT,validarCampos],getMedicoById);

module.exports = router;
