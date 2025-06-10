import mongoose from "mongoose";

const mongoURI = 'mongodb://localhost:27017/listaDeContatos'

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongo conectado com sucesso!')
    } catch (err) {
        console.error('Erro ao conectar com o Mongo:', err.message)
        process.exit(1)
    }
}

export default connectDB