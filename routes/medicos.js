const { Router } = require("express");

const {
  getMedicos,
  crearMedico,
  borrarMedico,
  actualizarMedico,
} = require("../controllers/medicos");

const router = Router();

router.get("/", getMedicos);
router.post("/", crearMedico);
router.put("/:id", actualizarMedico);
router.delete("/:id", borrarMedico);

module.exports = router;
