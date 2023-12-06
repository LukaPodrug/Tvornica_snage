import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import Button from '../../../../components/button'
import { deletePromotionAPI } from '../../../../API/promotion'
import styles from './style.module.css'

function DeletePromotionModal({ isOpen, changeIsOpen, id, promotionDeleted, changePromotionDeleted }) {
    const [token] = useRecoilState(store.token)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    async function deletePromotion() {
        try {
            setLoading(true)
            const deletePromotionResponse = await deletePromotionAPI(token, id)
            setMessage(deletePromotionResponse.data)
            setSuccess(true)
            setLoading(false)
            changePromotionDeleted(!promotionDeleted)
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
                    title='delete promotion'
                    closeModal={closeModal}
                />
                <Button
                    disabled={false}
                    text='delete'
                    method={loading ? () => {} : () => deletePromotion()}
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

export default DeletePromotionModal