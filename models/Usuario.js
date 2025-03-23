const mongoose =  require('mongoose');
const { Schema } =  mongoose;


const UsuarioSchema = new Schema({
        usuario:{
            type:String,
            required:true
        },
        contrasena:{
            type:String,
            required:true
        },
        refreshTokens:[{type:String}],

});

module.exports = mongoose.model('Usuario',UsuarioSchema);
