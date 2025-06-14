import ContatoItem from "./ContatoItem";

function ContatoLista({ contatos, onContatoDeletar, onContatoEditar }) {
    if (contatos.length === 0) {
        return <p>Nenhum contato cadastrado! Que tal cadastrar algum?</p>
    }

    return (
        <ul>
            {contatos.map(contato => (
                <ContatoItem 
                key={contato._id} 
                contato={contato}
                onDelete={onContatoDeletar}
                onEdit={onContatoEditar}
                />
            ))}
        </ul>
    )
}

export default ContatoLista