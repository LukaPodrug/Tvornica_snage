import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import Button from '../../../../components/button'
import { deletePartnerAPI } from '../../../../API/partner'
import styles from './style.module.css'

function DeletePartnerModal({ isOpen, changeIsOpen, id, partnerDeleted, changePartnerDeleted }) {
    const [token] = useRecoilState(store.token)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    async function deletePartner() {
        try {
            setLoading(true)
            const deletePartnerResponse = await deletePartnerAPI(token, id)
            setMessage(deletePartnerResponse.data)
            setSuccess(true)
            setLoading(false)
            changePartnerDeleted(!partnerDeleted)
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
                    title='delete partner'
                    closeModal={closeModal}
                />
                <Button
                    disabled={false}
                    text='delete'
                    method={loading ? () => {} : () => deletePartner()}
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

export default DeletePartnerModal