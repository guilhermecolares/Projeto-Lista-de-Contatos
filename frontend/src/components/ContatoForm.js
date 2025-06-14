import { useEffect, useState } from 'react'
import axios from 'axios'
import CampoDeInput from './CampoDeInput'
import ButtonEnviar from './ButtonEnviar'

function ContatoForm({ contatoAtual ,aoContatoAdicionarOuAtualizar }) {
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        if(contatoAtual) {
            setNome(contatoAtual.nome)
            setEmail(contatoAtual.email)
            setTelefone(contatoAtual.telefone)
            setMensagem('')
        } else {
            setNome('');
            setEmail('');
            setTelefone('');
            setMensagem('');
        }
    }, [contatoAtual])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setMensagem(contatoAtual ? 'Atualizando contato...' : 'Adicionando contato...')

        try {
            const dadosDoContato = {nome, email, telefone}
            let resposta

            if(contatoAtual) {
                resposta = await axios.put(`http://localhost:9091/api/contatos/${contatoAtual._id}`, dadosDoContato)
                setMensagem('Contato atualizado com sucesso!')
            } else {
                resposta = await axios.post(`http://localhost:9091/api/contatos`, dadosDoContato)
            }

            if (aoContatoAdicionarOuAtualizar) {
                aoContatoAdicionarOuAtualizar(resposta.data)
            }
        } catch (err) {
        console.error(`Erro ao adicionar contato! ${err.response ? err.response.data : err.message}`)
        setMensagem(err.response && err.response.data && err.response.data.msg ? `Erro: ${err.response.data.msg}` : `Erro ao ${contatoAtual} ? 'atualizar!' : 'adicionar!' verifique os dados e tente novamente.`)
        }
    }


    return (
        <div>
            <h2>{contatoAtual ? 'Editar Contato' : 'Adicionar Novo Contato'}</h2>
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
                type='email'
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
                text={contatoAtual ? 'Atualizar Contato' : 'Adicionar Contato'}
                />
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    )
}

export default ContatoForm