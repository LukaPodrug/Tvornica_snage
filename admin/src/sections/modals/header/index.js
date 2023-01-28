import Header from '../../../components/header'
import Button from '../../../components/button'
import styles from './style.module.css'

function ModalHeader({ title, closeModal }) {
    return (
        <div 
            className={styles.wrapper}
        >
            <Header
                title={title}
                style={null}
            />
            <Button
                disabled={false}
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