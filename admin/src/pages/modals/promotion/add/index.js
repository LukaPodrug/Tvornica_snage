import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import DropdownInput from '../../../../components/input/dropdown'
import TextInput from '../../../../components/input/text'
import Button from '../../../../components/button'
import { addPromotionAPI } from '../../../../API/promotion'
import styles from './style.module.css'
import '../../style.css'

function AddPromotionModal({ isOpen, changeIsOpen, partnersData, newPromotionAdded, changeNewPromotionAdded }) {
    const [token] = useRecoilState(store.token)

    const [partnerId, setPartnerId] = useState('')
    const [code, setCode] = useState('')
    const [description, setDescription] = useState('')

    const [partnerIdError, setPartnerIdError] = useState(false)
    const [codeError, setCodeError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    async function addPromotion() {
        if(partnerId === '') {
            setPartnerIdError(true)
        }
        if(code === '') {
            setCodeError(true)
        }
        if(partnerId !== '' && code !== '') {
            try {
                setLoading(true)
                const addPromotionResponse = await addPromotionAPI(token, partnerId, code, description)
                setMessage(addPromotionResponse.data)
                setSuccess(true)
                clearForm()
                setLoading(false)
                changeNewPromotionAdded(!newPromotionAdded)
            }
            catch(error) {
                setSuccess(false)
                setMessage(error.response.data)
                setLoading(false)
                return
            }
        }
    }

    function clearForm() {
        setPartnerId('')
        setPartnerIdError(false)
        setCode('')
        setCodeError(false)
        setDescription('')
    }

    function closeModal() {
        setMessage(null)
        clearForm()
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
                    title='add new promotion'
                    closeModal={closeModal}
                />
                <form
                    className={styles.form}
                >
                    <div 
                        className={styles.inputs}
                    >
                        <DropdownInput
                            label='partner'
                            person={false}
                            program={true}
                            choices={partnersData}
                            value={partnerId}
                            changeValue={setPartnerId}
                            error={partnerIdError}
                            changeError={setPartnerIdError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextInput
                            label='code'
                            showPlaceholder={false}
                            placeholder=''
                            text={code}
                            changeText={setCode}
                            error={codeError}
                            changeError={setCodeError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextInput
                            label='description'
                            showPlaceholder={false}
                            placeholder=''
                            text={description}
                            changeText={setDescription}
                            error={false}
                            changeError={() => {}}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                    </div>
                </form>
                <Button
                        disabled={false}
                        text='submit'
                        method={loading ? () => {} : () => addPromotion()}
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

export default AddPromotionModal