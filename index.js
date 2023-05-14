require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {dbConnection} = require('./database/config')

//Express server
const app = express()

//Configurar CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json())

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


//Base de datos
dbConnection()

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})