import styles from './style.module.css'

function Section({ id, image, property, value, button, showText, openModal, remove }) {
    function clickHandle() {
        if(openModal) {
            openModal(true)
        }
        else if(remove) {
            remove(id)
        }
    }

    return (
        <div 
            className={styles.wrapper + ' ' + (button && styles.button)}
            onClick={button ? () => clickHandle() : () => {}}
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