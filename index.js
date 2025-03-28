const express =  require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const conectarDB = require("./config/config.js");

conectarDB.conectarDB();  
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // o el puerto desde donde pruebas
    credentials: true
}));
// app.use(cookieParser());

app.use('/Devops',require('./routes/routes'));



app.listen('3000', (req,res)=>{
    console.log("Server corriendo en el puerto 3000");
});


























// const express= require('express');
// const cors = require('cors');


// const app = express();
// app.use(cors);
// app.use(express.json());

// app.get('/saludar/:nombre', async (req,res) =>{
//     try{
//         const params = req.params.nombre
//         const res = await fetch("Http.api.com",);
//     }
//     catch(error){
//         res.status(500).json({error:"Error al obtener los datos"})
//     }
// })

// app.listen('3000',()=>{
//     console.log("Servidor corriendo en puerto 3000");
// });

