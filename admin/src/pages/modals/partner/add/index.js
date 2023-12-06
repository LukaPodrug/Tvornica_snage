import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import TextInput from '../../../../components/input/text'
import Button from '../../../../components/button'
import { addPartnerAPI } from '../../../../API/partner'
import styles from './style.module.css'
import '../../style.css'

function AddPartnerModal({ isOpen, changeIsOpen, newPartnerAdded, changeNewPartnerAdded }) {
    const [token] = useRecoilState(store.token)

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    const [nameError, setNameError] = useState(false)
    const [linkError, setLinkError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    async function addPartner() {
        if(name === '') {
            setNameError(true)
        }
        if(link === '') {
            setLinkError(true)
        }
        if(name !== '' && link !== '') {
            try {
                setLoading(true)
                const addPartnerResponse = await addPartnerAPI(token, name, link)
                setMessage(addPartnerResponse.data)
                setSuccess(true)
                clearForm()
                setLoading(false)
                changeNewPartnerAdded(!newPartnerAdded)
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
                    title='add new partner'
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
                        disabled={false}
                        text='submit'
                        method={loading ? () => {} : () => addPartner()}
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

export default AddPartnerModal