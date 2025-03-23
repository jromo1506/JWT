const mongoose = require('mongoose');
const {Schema} =  mongoose;


const TokenSchema = new Schema({
    token:{
        type:String
    },
    idUsuario:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Token",TokenSchema);