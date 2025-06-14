import styles from './styles/ContatoItem.module.css'

function ContatoItem({ contato, onDelete, onEdit }) {
    return (
        <li className={styles.itemDaLista}>
            <span className={styles.textoContato}>
                {contato.nome} - {contato.email} - {contato.telefone}
            </span>

            <div>
                <button className={styles.btnEditar} onClick={() => onEdit(contato)}>
                    Editar
                </button>

                <button className={styles.btnExcluir} onClick={() => onDelete(contato._id)}>
                    Excluir
                </button>
            </div>
        </li>
    )
}

export default ContatoItem