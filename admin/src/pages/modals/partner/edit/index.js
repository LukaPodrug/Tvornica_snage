import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import TextInput from '../../../../components/input/text'
import Button from '../../../../components/button'
import { editPartnerAPI } from '../../../../API/partner'
import styles from './style.module.css'
import '../../style.css'

function EditPartnerModal({ isOpen, changeIsOpen, id, nameOld, linkOld, partnerEdited, changePartnerEdited }) {
    const [token] = useRecoilState(store.token)

    const [nameRecieved, setNameRecieved] = useState(nameOld)
    const [linkRecieved, setLinkRecieved] = useState(linkOld)

    const [name, setName] = useState(nameOld)
    const [link, setLink] = useState(linkOld)

    const [nameError, setNameError] = useState(false)
    const [linkError, setLinkError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(name === nameRecieved && link === linkRecieved) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [name, link])

    function resetRecievedValues() {
        setNameRecieved(name)
        setLinkRecieved(link)
    }

    async function editPartner() {
        if(name === '') {
            setNameError(true)
        }
        if(link === '') {
            setLinkError(true)
        }
        if(name !== '' && link !== '') {
            try {
                setLoading(true)
                const editPartnerResponse = await editPartnerAPI(token, id, name, link)
                setMessage(editPartnerResponse.data)
                setSuccess(true)
                resetRecievedValues()
                setLoading(false)
                changePartnerEdited(!partnerEdited)
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
        setName('')
        setNameError(false)
        setLink('')
        setLinkError(false)
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
                    title='edit partner'
                    closeModal={closeModal}
                />
                <form
                    className={styles.form}
                >
                    <div 
                        className={styles.inputs}
                    >
                        <TextInput
                            label='name'
                            showPlaceholder={false}
                            placeholder=''
                            text={name}
                            changeText={setName}
                            error={nameError}
                            changeError={setNameError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextInput
                            label='link'
                            showPlaceholder={false}
                            placeholder=''
                            text={link}
                            changeText={setLink}
                            error={linkError}
                            changeError={setLinkError}
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
                    method={loading ? () => {} : () => editPartner()}
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

export default EditPartnerModal