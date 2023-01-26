import styles from './style.module.css'

function Section({ image, property, value, button, showText, openModal }) {
    return (
        <div 
            className={styles.wrapper + ' ' + (button && styles.button)}
            onClick={button ? () => openModal(true) : () => {}}
        >
            {
                image && 
                    <div
                        className={styles.image + ' ' + ((property === 'coach' || (showText === false && button === false)) && styles.profile)}
                    >
                        <img
                            src={image}
                            alt='icon'
                        />
                    </div>
            }
            {
                showText &&
                    <>
                        <label
                            className={styles.key}
                        >
                            {property}
                        </label>
                        <label
                            className={styles.value}
                        >
                            {value}
                        </label>
                    </>
            }
        </div>
    )
}

export default Section