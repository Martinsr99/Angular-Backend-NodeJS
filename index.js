const express = require('express')
require('dotenv').config()

const {dbConnection} = require('./database/config')

const app = express()

//Rutas

//Base de datos
dbConnection()

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`)
})