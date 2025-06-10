import express from 'express'
import connectDB from './config/db.js'
import cors from 'cors'
import contatosRoutes from './routes/contatos.js'

const app = express()

connectDB()

app.use(cors())

app.use(express.json({ extended:false }))

app.get('/', (req, res) => {
    res.send('Api rodando...')
})

app.use('/api/contatos', contatosRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))