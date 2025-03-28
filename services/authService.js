const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path:'variables.env'});
const Usuario = require('../models/Usuario');


const generarAccessToken = (user)=> {
    //Aqui como usamos mongoose debemos de convertir a objeto
    const payload = {...user.toObject()};
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.ACCESS_EXPIRES});
};


const generarRefreshToken = async(user) => {
    //Aqui como usamos mongoose debemos de convertir a objeto
    const payload = {...user.toObject()};
    
    const refreshToken =  jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.REFRESH_EXPIRES});
    await Usuario.findByIdAndUpdate(user._id,{$push:{refreshTokens:refreshToken}});
    return refreshToken;
};


const verifiyRefreshToken = async(token) => {
    try{
        const decoded = jwt.verify(token.process.env.JWT_REFRESH_SECRET);
        const user = await UserActivation.findById(decoded.id);
        if(!user || !user.refreshTokens.includes(token)){
            throw new Error("Token invalido");
        }
        return user;
    }
    catch(error){
        throw new Error("Refresh token invalido");
    }
}






module.exports = {
    generarAccessToken,
    generarRefreshToken,
    verifiyRefreshToken
};