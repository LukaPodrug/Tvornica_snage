import styles from './style.module.css'

function SideMenuIcon({ icon }) {
    return (
        <div
            className={styles.wrapper}
        >
            <img
                src={icon}
            />
        </div>
    )
}

export default SideMenuIcon