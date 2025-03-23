const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');


const anadirUsuario = async (req,res) => {
    try{
        const usuario =  req.body;
        console.log(usuario);
        const nuevoUsuario = new Usuario(usuario);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario)

    }
    catch(err){
        return res.status(500).json(err);
    }
  
}

const eliminarUsuario = async(req,res) => {
    try{
        const id =  req.params.id;
        const eliminado  = await Usuario.findByIdAndDelete(id);
        res.status(200).json(eliminado);
    }
    catch(err){
        return res.status(500).json(err);
    }

}

const modificarUsuario = async(req,res) =>{
    try{
        const id = req.params.id;
        const modificacion = req.body;
        await Usuario.findByIdAndUpdate(id,modificacion,{new:true})
    }
    catch(err){
        return res.status(500).json(err);
    }
}

const obtenerUsuarios = async(req,res) => {
    try{
        const usuarios  = await Usuario.find();
        if(!usuarios){
            res.status(404).json({mensaje:"No se encontro ningun usuario"});
        }

        res.status(200).json(usuarios);

    }
    catch(err){
        res.status(500).json(err)
    }
}

const obtenerUsuarioPorId = async(req,res) => {
    try{
        const id = req.params.id;
        const busc = Usuario.findById(id);
        if(!busc){
            res.status(404).json({mensaje:"No se encontro el usuario"});
        }
        res.status(200).json(busc);
    }
    catch(err){
        return res.status(500).json(err);
    }
}


const loginUsuario = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        const usuarioEnc = await Usuario.findOne({ usuario, contrasena });

        if (!usuarioEnc) {
            return res.status(404).json({ mensaje: "No se encontró ningún usuario" });
        }

        const token = jwt.sign({ id: usuarioEnc._id }, 'secreto', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    anadirUsuario,
    eliminarUsuario,
    modificarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    loginUsuario
}