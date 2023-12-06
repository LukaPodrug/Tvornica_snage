import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import DropdownInput from '../../../../components/input/dropdown'
import TextInput from '../../../../components/input/text'
import Button from '../../../../components/button'
import { editPromotionAPI } from '../../../../API/promotion'
import styles from './style.module.css'
import '../../style.css'

function EditPromotionModal({ isOpen, changeIsOpen, partnersData, id, partnerIdOld, codeOld, descriptionOld, promotionEdited, changePromotionEdited }) {
    const [token] = useRecoilState(store.token)

    const [partnerIdRecieved, setPartnerIdRecieved] = useState(partnerIdOld)
    const [codeRecieved, setCodeRecieved] = useState(codeOld)
    const [descriptionRecieved, setDescriptionRecieved] = useState(descriptionOld)

    const [partnerId, setPartnerId] = useState(partnerIdOld)
    const [code, setCode] = useState(codeOld)
    const [description, setDescription] = useState(descriptionOld)

    const [partnerIdError, setPartnerIdError] = useState(false)
    const [codeError, setCodeError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(partnerId === partnerIdRecieved && code === codeRecieved && description === descriptionRecieved) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [partnerId, code, description])

    function resetRecievedValues() {
        setPartnerIdRecieved(partnerId)
        setCodeRecieved(code)
        setDescriptionRecieved(description)
    }

    async function editPromotion() {
        if(partnerId === '') {
            setPartnerIdError(true)
        }
        if(code === '') {
            setCodeError(true)
        }
        if(partnerId !== '' && code !== '') {
            try {
                setLoading(true)
                const editPromotionResponse = await editPromotionAPI(token, id, partnerId, code, description)
                setMessage(editPromotionResponse.data)
                setSuccess(true)
                resetRecievedValues()
                setLoading(false)
                changePromotionEdited(!promotionEdited)
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
                    title='edit promotion'
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
                    disabled={disabled}
                    text='submit'
                    method={loading ? () => {} : () => editPromotion()}
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

export default EditPromotionModal