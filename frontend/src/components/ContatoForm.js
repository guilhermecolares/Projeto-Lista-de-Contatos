import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CampoDeInput from './CampoDeInput'
import ButtonEnviar from './elements/ButtonEnviar'
import styles from './styles/ContatoForm.module.css'

function ContatoForm({ contatoAtual ,aoContatoAdicionarOuAtualizar }) {
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensagem, setMensagem] = useState('')

    const nameInputRef = useRef(null)

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

        if (nameInputRef.current) {
            nameInputRef.current.focus();
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
                setMensagem('Contato adicionado com sucesso!')
            }

            if (aoContatoAdicionarOuAtualizar) {
                aoContatoAdicionarOuAtualizar(resposta.data)
            }

            setTimeout(() => {
                setMensagem('')
            }, 3000)
        } catch (err) {
        console.error(`Erro ao adicionar contato!`, err.response ? err.response.data : err.message)
        const tipoOperacao = contatoAtual ? 'atualizar' : 'adicionar'
        const mensagemErroBackend = err.response && err.response.data && err.response.data.msg
        if (mensagemErroBackend) {
            setMensagem(`Erro: ${mensagemErroBackend}`);
        } else {
            setMensagem(`Erro ao ${tipoOperacao} contato! Verifique os dados e tente novamente.`)
        }
        setTimeout(() => {
            setMensagem('')
        }, 3000)
    }
    }


    return (
        <div>
            <h2>{contatoAtual ? 'Editar Contato' : 'Adicionar Novo Contato'}</h2>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <CampoDeInput
                ref={nameInputRef}
                className={styles.formInput}
                label='Nome'
                type='text'
                id='nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                />

                <CampoDeInput
                className={styles.formInput}
                label='Email'
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                />

                <CampoDeInput
                className={styles.formInput}
                label='Telefone'
                type='text'
                id='telefone'
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required={true}
                />

                <ButtonEnviar
                className={styles.buttonEnviar}
                type='submit'
                text={contatoAtual ? 'Atualizar Contato' : 'Adicionar Contato'}
                />
            </form>
            {mensagem && <p className={`message ${mensagem.includes('sucesso') ? 'success' : 'error'}`}>{mensagem}</p>}
        </div>
    )
}

export default ContatoForm