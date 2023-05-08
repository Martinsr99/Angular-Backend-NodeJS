const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_CNN);
    } catch (error) {
        console.log('Error al conectar a la base de datps')
    }



}

module.exports = {
    dbConnection
}