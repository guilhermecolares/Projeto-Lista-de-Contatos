import styles from './styles/ContatoItem.module.css'

function ContatoItem({ contato, onDelete, onEdit }) {

    console.log("URL da foto de perfil:", contato.fotoPerfil);
    return (
        <li className={styles.contactItem}>
            <div>
                <img 
                src={contato.fotoPerfil}
                alt={`Foto de pefil de ${contato.nome}`}
                className={styles.profilePicture}
                />

                <p className={styles.contactName}>{contato.nome}</p>
            </div>
                
                <p>{contato.email}</p>
                <p>{contato.telefone}</p>

            <div className={styles.contactButtons}>
                <button className={styles.editButton} onClick={() => onEdit(contato)}>
                    Editar
                </button>

                <button className={styles.deleteButton} onClick={() => onDelete(contato._id)}>
                    Excluir
                </button>
            </div>
        </li>
    )
}

export default ContatoItem