import styles from './style.module.css'

function SwitchInput({ switchedOn, changeSwitchedOn }) {
    return (
        <div
            onClick={() => changeSwitchedOn(!switchedOn)}
        >
            <input
                className={styles.input}
                type="checkbox"
            />
            <div
                className={styles.switch + ' ' + (switchedOn ? styles.switchOn : styles.switchOff)}
            >
                <div 
                    className={styles.toggle + ' ' + (switchedOn ? styles.toggleOn : styles.toggleOff)}
                />
            </div>
        </div>
    )
}

export default SwitchInput