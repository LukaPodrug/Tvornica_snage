import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import Button from '../../../../components/button'
import { deleteUserAPI } from '../../../../API/user'
import styles from './style.module.css'

function DeleteUserModal({ isOpen, changeIsOpen, id, userDeleted, changeUserDeleted }) {
    const [token] = useRecoilState(store.token)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    async function deleteUser() {
        try {
            setLoading(true)
            const deleteUserResponse = await deleteUserAPI(token, id)
            setMessage(deleteUserResponse.data)
            setSuccess(true)
            setLoading(false)
            changeUserDeleted(!userDeleted)
        }
        catch(error) {
            setSuccess(false)
            setMessage(error.response.data)
            setLoading(false)
            return
        }
    }

    function closeModal() {
        setMessage(null)
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
                    title='delete user'
                    closeModal={closeModal}
                />
                <Button
                    disabled={false}
                    text='delete'
                    method={loading ? () => {} : () => deleteUser()}
                    loading={loading}
                    showMessage={true}
                    message={message}
                    changeMessage={setMessage}
                    buttonStyle={styles.button}
                    messageStyle={success ? styles.messageSuccess : styles.messageFail}
                />
            </div>
        </Modal>
    )
}

export default DeleteUserModal