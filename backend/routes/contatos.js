import express from 'express'
import Contato from '../models/Contato'

const router = express.Router()

router.post('/', async (req, res) => {
    const { nome, telefone, email, fotoPerfil } = req.body

    try {
        let contatoExistente = await Contato.findOne({ email })

        if (contatoExistente) {
            return res.status(400).json({ msg: 'Já existe um contato com este e-mail!' })
        }

        const novoContato = new Contato({
            nome,
            telefone,
            email,
            fotoPerfil
        })

        const contatoSalvo = await novoContato.save()
        res.status(201).json(contatoSalvo)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Erro no servidor! tente novamente.')
    }
})