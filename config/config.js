const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const conectarDB  = async() => {
    try{
        await mongoose.connect(process.env.DB_MONGO,{})
        console.log("Base de datos connectada");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}


module.exports = {
    conectarDB
}