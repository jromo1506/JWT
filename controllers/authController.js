const Usuario = require('../models/Usuario');
const authService  = require('../controllers/usuarioController');
const { generarAccessToken, generarRefreshToken, verifiyRefreshToken } = require('../services/authService');
const bcrypt = require("bcrypt");

const login = async(req,res) =>{
    try{
        const {usuario,contrasena} = req.body;

        const user = await Usuario.findOne({usuario});
        console.log(user);
        if(!user || !(await bcrypt.compare(contrasena,user.contrasena))){
            return res.status(401).json({ message:"Credenciales incorrectas"});
        }
        const accessToken = generarAccessToken(user);
        const refreshToken = await generarRefreshToken(user);
    
        res.json({accessToken,refreshToken});
    }

    catch(error){
        return res.status(500).json({error});
    }
    
}

const refresh = async () => {
    try{
        const {refreshToken} = req.body;
        if(!refreshToken){
            return res.status(401).json({message:"Token requerido"});
        }
        const user = await verifiyRefreshToken(refreshToken);
        const nuevoToken = generarAccessToken(user);
        res.json({accessToken:nuevoToken});

    }
    catch(err){
        res.status(403).json({ message: error.message });
    }
}



const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Token requerido" });
  
    await User.findOneAndUpdate({ refreshTokens: refreshToken }, { $pull: { refreshTokens: refreshToken } });
  
    res.json({ message: "Cierre de sesión exitoso" });
  };


  module.exports = {login,refresh,logout};