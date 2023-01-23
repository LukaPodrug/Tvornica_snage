import styles from './style.module.css'

function Section({ image, property, value, button }) {
    return (
        <div 
            className={styles.wrapper + ' ' + (button && styles.button)}
        >
            <div
                className={styles.image + ' ' + ((property === 'coach') && styles.profile)}
            >
                <img
                    src={image}
                    alt='icon'
                />
            </div>
            {
                !button &&
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