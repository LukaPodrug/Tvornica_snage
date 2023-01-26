import styles from './style.module.css'

function Tab({ text, active, tab, changeActiveTab }) {
    return (
        <div 
            className={styles.wrapper + ' ' + (active && styles.active)}
            onClick={() => changeActiveTab(tab)}
        >
            {text}
        </div>
    )
}

export default Tab