import React, { useState, useEffect } from "react";
import axios from 'axios'

function App() {
  const [contatos, setContatos] = useState([])
  const [loading, setLoanding] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const buscaDeContatos = async() => {

      try {
        const resposta = await axios.get('http://localhost:9091/api/contatos')

        setContatos(resposta.data.contatos)

        setLoanding(false)
      } catch (err) {
        console.error('Erro ao buscar contatos:', err)
        setError('Não foi possível buscar os contatos, tente novamente!')
        setLoanding(false)
      }
    }

    buscaDeContatos()
  }, [])

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
      <h4>({contatos.length}) contatos encontrados!</h4>

      {contatos.length === 0 ? (
        <p>Nenhum contato cadastrado! que tal cadastrar algum?</p>
      ) : (
        <ul>
          {contatos.map(contato => (
            <li key={contato._id}>
              {contato.nome} - {contato.email} - {contato.telefone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;