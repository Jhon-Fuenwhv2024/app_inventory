const mongoose = require('mongoose');

const getConnetion = async() => {

    try {

        const uri = process.env.MONGOOSE_URI

        await mongoose.connect(uri);

        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log("Error al conectar con la base de datos", error);
        process.exit(1);
    }
};

module.exports = {
    getConnetion
}