const jwt = require('jsonwebtoken');



const  verificiarWebToken = (req,res,next)=>{
    try{
        const token =  req.header('Authorization');
        if(!token){
            return res.status(403).json({err:"No tiene autorizacion"});
        }
        const verificar =  jwt.verify(token.split(' ')[1],"secreto");
        req.user = verificar;
        next();
    }
    catch(err){
        res.status(401).json({mensaje:"Token invalido",err});
    }
    
}


module.exports = verificiarWebToken;