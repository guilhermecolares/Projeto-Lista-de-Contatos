import styles from './styles/ContatoItem.module.css'

function ContatoItem({ contato, onDelete }) {
    return (
        <li className={styles.itemDaLista}>
            <span className={styles.textoContato}>
                {contato.nome} - {contato.email} - {contato.telefone}
            </span>

            <button className={styles.btnExcluir} onClick={() => onDelete(contato._id)}>
                Excluir
            </button>
        </li>
    )
}

export default ContatoItem