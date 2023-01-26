import { useState } from 'react'
import Modal from 'react-modal'

import ModalHeader from '../../../../../sections/modals/header'
import Menu from '../../../../../components/menu'
import styles from './style.module.css'
import '../../../style.css'

function EditTrainingAttendanceModal({ isOpen, changeIsOpen }) {
    const tabs = ['reservations', 'unannounced']

    const [activeTab, setActiveTab] = useState(0)

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
                <Menu
                    tabs={tabs}
                    activeTab={activeTab}
                    changeActiveTab={setActiveTab}
                    style={styles.menu}
                />
            </div>
        </Modal>
    )
}

export default EditTrainingAttendanceModal