const mongoose = require('mongoose');

const getConnection = async() => {

    try {

        const uri = process.env.MOONGOSE_URI;

        await mongoose.connect(uri);

        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log("Error al conectar con la base de datos", error);
        process.exit(1);
    }
};

module.exports = {
    getConnection
}