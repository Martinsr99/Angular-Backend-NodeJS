const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res) => {
  busqueda = req.params.busqueda || "";
  const regex = new RegExp(busqueda, "i");

  if (busqueda != "") {
    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
    ]);

    res.json({
      usuarios,
      medicos,
      hospitales,
      ok: true,
    });
  }
};

const getDocumentosColeccion = async (req, res) => {
  busqueda = req.params.busqueda || "";
  tabla = req.params.tabla || "";
  const regex = new RegExp(busqueda, "i");
  let data;

  if (busqueda != "" && tabla != "") {
    switch (tabla) {
      case "medicos":
        data = await Medico.find({ nombre: regex })

        break;
      case "hospitales":
        data = await Hospital.find({ nombre: regex })

        break;
      case "usuarios":
        data = await Usuario.find({ nombre: regex })

        break;

      default:
        return res.status(400).json({
          msg: "La tabla requerida no existe",
          ok: false,
        });
    }
    return res.json({
      ok: true,
      data,
    });
  }
};

module.exports = { getTodo, getDocumentosColeccion };
