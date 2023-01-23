import Modal from 'react-modal'

import styles from './style.module.css'

function AddTrainingModal({ isOpen, setIsOpen }) {
    const style = {
        content: {
            marginLeft: '250px'
        }
    }

    return (
        <Modal
            style={style}
            isOpen={isOpen}
        />
    )
}

export default AddTrainingModal