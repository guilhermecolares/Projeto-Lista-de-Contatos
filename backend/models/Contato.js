import mongoose from "mongoose";

const NovoContato = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    fotoPerfil: {
        type: String,
        default: 'images/fotoDePerfilDefault.jpeg'
    },
    dataDeCriação: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Contato', NovoContato)