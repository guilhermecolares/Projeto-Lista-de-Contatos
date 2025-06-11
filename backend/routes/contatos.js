import express from 'express'
import Contato from '../models/Contato'
import mongoose, { Mongoose } from 'mongoose'

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

router.get('/', async (req, res) => {

    try {
        const contatos = await Contato.find().sort({ nome: 1})
        const totalDeContatos = await Contato.countDocuments()

        res.status(200).json({ contatos, totalDeContatos })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Falha ao puxar os contatos, tente novamente!')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const buscaDeContato = await Contato.findById(id).lean()

        if (!buscaDeContato) {
            return res.status(404).json({ msg: 'Contato não encontrado! verifique o ID e tente novamente.'})
        }

        res.status(200).json(buscaDeContato)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID do contato inválido! verifique e tente novamente.'})
        }

        res.status(500).send('Erro ao encontrar o contato, tente novamente!')
    }
})

router.get('/buscar', async (req, res) => {
    try {
        const query = {}

        const nome = req.query.nome
        const email = req.query.email

        if (nome) {
            query.nome = { $regex: new RegExp(nome, 'i') }
        }

        if (email) {
            query.email = { $regex: new RegExp(email, 'i') }
        }

        const contatos = await Contato.find(query)

        return res.status(200).json(contatos)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Erro ao encontrar os contatos.')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, telefone, email, fotoPerfil } = req.body

        const buscaDeContato = await Contato.findById(id)
        

        if (!buscaDeContato) {
            return res.status(404).json({ msg: 'Falha ao encontrar contato! tente novamente.'})
        }
        
        if (email && email !== buscaDeContato.email) {
            const emailEmUso = await Contato.findOne({ email })
            if (emailEmUso) {
                return res.status(400).json({ msg: 'Esse e-mail já está em uso! insira um e-mail válido e tente novamente!'})
            }
        }

        buscaDeContato.nome = nome || buscaDeContato.nome
        buscaDeContato.telefone = telefone || buscaDeContato.telefone
        buscaDeContato.email = email || buscaDeContato.email
        buscaDeContato.fotoPerfil = fotoPerfil || buscaDeContato.fotoPerfil

        await buscaDeContato.save()

        res.status(200).json(buscaDeContato)
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID do contato inválido! verifique e tente novamente.'})
        }

        res.status(500).send('Erro ao atualizar o contato! tente novamente.')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deletarContato = await Contato.findByIdAndDelete(id)

        if (!deletarContato) {
            return res.status(404).json({ msg: 'Falha ao encontrar contato para deletar! tente novamente.'})
        }


        res.status(200).json({ msg: 'Contato excluído com sucesso!'})
    } catch (err) {
        console.error(err.message)

        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID do contato inválido! verifique e tente novamente.'})
        }

        res.status(500).send('Erro ao deletar o contato! tente novamente.')
    }
})

export default router