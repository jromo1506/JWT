const Usuario = require('../models/Usuario');
const authService  = require('../controllers/usuarioController');
const { generarAccessToken, generarRefreshToken, verifiyRefreshToken } = require('../services/authService');


const login = async(req,res) =>{
    const {usuario,contrasena} = req.body;
    const user = await Usuario.findOne({usuario});
    if(!user || (await bcrypt.compare(contrasena,user.contrasena))){
        return res.status(401).json({ message:"Credenciales incorrectas"});
    }
    const accessToken = generarAccessToken();
    const refreshToken = await generarRefreshToken();

    res.json({accessToken,refreshToken});
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