import Modal from 'react-modal'

import ModalHeader from '../../../../sections/modals/header'
import Info from '../../../../components/info'
import styles from './style.module.css'

function TrainingDetailsModal({ isOpen, changeIsOpen, coachFirstName, coachLastName, date, start, finish, room, capacity, level, title, regime, exercises }) {
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
                    title='training details'
                    closeModal={closeModal}
                />
                <div className={styles.data}>
                    <Info
                        property='coach'
                        value={coachFirstName + ' ' + coachLastName}
                    />
                    <Info
                        property='date'
                        value={date}
                    />
                    <Info
                        property='start'
                        value={start}
                    />
                    <Info
                        property='finish'
                        value={finish}
                    />
                    <Info
                        property='room'
                        value={room}
                    />
                    <Info
                        property='capacity'
                        value={capacity}
                    />
                    <Info
                        property='level'
                        value={level}
                    />
                    <Info
                        property='title'
                        value={title}
                    />
                    <Info
                        property='regime'
                        value={regime}
                    />
                    <Info
                        property='exercises'
                        value={exercises}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default TrainingDetailsModal