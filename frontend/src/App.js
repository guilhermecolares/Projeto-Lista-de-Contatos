import React, { useState, useEffect } from "react";
import axios from 'axios'
import ContatoLista from "./components/ContatoLista";
import ContatoForm from "./components/ContatoForm";

function App() {
  const [contatos, setContatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const buscaDeContatos = async() => {

      try {
        const resposta = await axios.get('http://localhost:9091/api/contatos')

        setContatos(resposta.data.contatos)

        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar contatos:', err)
        setError('Não foi possível buscar os contatos, tente novamente!')
        setLoading(false)
      }
    }

    buscaDeContatos()
  }, [])

  const handleContatoAdicionado = (novoContato) => {
    setContatos(prevContatos => [...prevContatos, novoContato])
  }

  const handleContatoDeletar = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este contato?')

    if (!confirm) {
      return
    }

    try {
      await axios.delete(`http://localhost:9091/api/contatos/${id}`)

      setContatos(prevContatos => prevContatos.filter(contato => contato._id !== id))
    } catch (err) {
      console.error('Erro ao excluir contato!:', err.response ? err.response.data : err.message)
      alert('Erro ao excluir contato. Tente novamente mais tarde.')
    }
  }

  if (loading) {
    return (
      <div>
        <h1>Lista de Contatos</h1>
        <p>Carregando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1>Lista de Contatos</h1>
        <p>Erro! {error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Lista de Contatos</h1>
      <ContatoForm aoContatoAdicionar={handleContatoAdicionado}/>

      <h4>({contatos.length}) contatos encontrados!</h4>
      <ContatoLista contatos={contatos} onContatoDeletar={handleContatoDeletar}/>
    </div>
  );
}

export default App;