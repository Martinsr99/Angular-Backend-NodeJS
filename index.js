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
app.use('/api/login', require('./routes/auth'));


//Base de datos
dbConnection()

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})