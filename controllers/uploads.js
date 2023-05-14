const {v4: uuidv4} = require('uuid')

const fileUpload = (req,res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios']

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'Tipo inválido'
        })
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg:'No hay imagen'
        })
    }

    const file = req.files.imagen

    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]

    //Validar extension
    const extensionesValidas = ['jpg','png','jpeg','gif']
    if(!extensionesValidas.includes(extensionArchivo)){
        res.status(404).json({
            ok:false,
            msg:'El archivo no es válido'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    //Path de la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //Mover la imagen
    file.mv(path, (err) => {
        if(err) return res.status(500).json({
            msg:err,
            ok:false
        })
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
    })

}

module.exports = {fileUpload}