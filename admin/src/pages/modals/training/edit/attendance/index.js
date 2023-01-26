import Modal from 'react-modal'

import ModalHeader from '../../../../../sections/modals/header'
import styles from './style.module.css'
import '../../../style.css'

function EditTrainingAttendanceModal({ isOpen, changeIsOpen }) {

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='edit training attendance'
                    closeModal={changeIsOpen}
                />
            </div>
        </Modal>
    )
}

export default EditTrainingAttendanceModal