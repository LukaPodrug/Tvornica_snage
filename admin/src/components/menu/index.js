import Tab from './tab'
import styles from './style.module.css'

function Menu({ tabs, activeTab, changeActiveTab, style }) {
    return (
        <div 
            className={styles.wrapper + ' ' + style}
        >
            {
                tabs.map((tab, index) => {
                    return (
                        <Tab
                            key={index}
                            text={tab}
                            active={index === activeTab}
                            tab={index}
                            changeActiveTab={changeActiveTab}
                        />
                    )
                })
            }
        </div>
    )
}

export default Menu