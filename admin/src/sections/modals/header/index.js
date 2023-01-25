import Button from '../../../components/button'
import styles from './style.module.css'

function ModalHeader({ title, closeModal }) {
    return (
        <div 
            className={styles.wrapper}
        >
            <label
                className={styles.text}
            >
                {title}
            </label>
            <Button
                text='close'
                method={() => closeModal()}
                loading={false}
                showMessage={false}
                message={null}
                changeMessage={() => {}}
                buttonStyle={styles.button}
                messageStyle={null}
            />
        </div>
    )   
}

export default ModalHeader