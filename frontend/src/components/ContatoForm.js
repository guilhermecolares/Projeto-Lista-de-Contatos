import { useState } from 'react'
import axios from 'axios'
import CampoDeInput from './CampoDeInput'
import ButtonEnviar from './ButtonEnviar'

function ContatoForm({ aoContatoAdicionar }) {
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMensagem('Adicionando contato...')

        try {
            const novoContato = {nome, email, telefone}
            const resposta = await axios.post('http://localhost:9091/api/contatos', novoContato)

            setMensagem('Contato adicionado com sucesso!')

            setNome('')
            setEmail('')
            setTelefone('')

            if (aoContatoAdicionar) {
                aoContatoAdicionar(resposta.data)
            }
        } catch (err) {
        console.error(`Erro ao adicionar contato! ${err.response ? err.response.data : err.message}`)
        setMensagem(err.response && err.response.data && err.response.data.msg ? `Erro: ${err.response.data.msg}` : 'Erro ao adicionar contato! verifique os dados e tente novamente.')
        }
    }


    return (
        <div>
            <h1>Adicionar Novo Contato</h1>
            <form onSubmit={handleSubmit}>
                <CampoDeInput
                label='Nome'
                type='text'
                id='nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                />

                <CampoDeInput
                label='Email'
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                />

                <CampoDeInput
                label='Telefone'
                type='text'
                id='telefone'
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required={true}
                />

                <ButtonEnviar
                type='submit'
                text='Adicionar Contato'
                />
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    )
}

export default ContatoForm