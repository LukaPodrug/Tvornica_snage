import Modal from 'react-modal'

import ModalHeader from '../../../../sections/modals/header'

import styles from './style.module.css'

function AddUserModal({ isOpen, changeIsOpen, userAdded, changeUserAdded }) {
    function closeModal() {
        changeIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='add reservation'
                    closeModal={closeModal}
                />
            </div>
        </Modal>
    )
}

export default AddUserModal