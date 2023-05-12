const { Router } = require("express");

const validarJWT = require("../middlewares/validar-jwt");
const {
  getHospitales,
  crearHospital,
  borrarHospital,
  actualizarHospital,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", getHospitales);
router.post("/", crearHospital);
router.put("/:id", actualizarHospital);
router.delete("/:id", borrarHospital);

module.exports = router;
