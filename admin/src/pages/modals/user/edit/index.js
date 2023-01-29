import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'
import moment from 'moment'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import Image from '../../../../components/image'
import Info from '../../../../components/info'
import TextInput from '../../../../components/input/text'
import NumberInput from '../../../../components/input/number'
import Button from '../../../../components/button'
import { editUserAPI } from '../../../../API/user'
import styles from './style.module.css'

function EditUserModal({ isOpen, changeIsOpen, id, image, firstName, lastName, membershipOld, levelOld, userEdited, changeUserEdited }) {
    const [token] = useRecoilState(store.token)

    const [membershipRecieved, setMembershipRecieved] = useState(membershipOld)
    const [levelRecieved, setLevelRecieved] = useState(levelOld)

    const [membership, setMembership] = useState(membershipOld)
    const [level, setLevel] = useState(levelOld)

    const [membershipError, setMembershipError] = useState(false)
    const [levelError, setLevelError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(membership ===  membershipRecieved && level === levelRecieved) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [membership, level])

    function resetRecievedValues() {
        setMembershipRecieved(membership)
        setLevelRecieved(level)
    }

    async function editUser() {
        if(membership === '') {
            setMembershipError(true)
        }
        if(level === '') {
            setLevelError(true)
        }
        if(membership !== '' && level !== '') {
            try {
                setLoading(true)
                const membershipFormatted = moment(membership, 'DD/MM/YYYY').format('YYYY-MM-DD')
                const editUserResponse = await editUserAPI(token, id, membershipFormatted, level)
                setMessage(editUserResponse.data)
                setSuccess(true)
                resetRecievedValues()
                setLoading(false)
                changeUserEdited(!userEdited)
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
        setMembership('')
        setMembershipError(false)
        setLevel('')
        setLevelError(false)
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
                    title='edit user'
                    closeModal={closeModal}
                />
                <form
                    className={styles.form}
                >
                    <Image
                        image={image}
                        showUpload={false}
                        upload={() => {}}
                        style={null}
                    />
                    <div
                        className={styles.data}
                    >
                        <Info
                            property='first name'
                            value={firstName}
                        />
                        <Info
                            property='last name'
                            value={lastName}
                        />
                        <TextInput
                            label='membership'
                            showPlaceholder={true}
                            placeholder='dd/mm/yyyy'
                            text={membership}
                            changeText={setMembership}
                            error={membershipError}
                            changeError={setMembershipError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <NumberInput
                            label='level'
                            showPlaceholder={false}
                            placeholder={null}
                            number={level}
                            changeNumber={setLevel}
                            error={levelError}
                            changeError={setLevelError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                    </div>
                    <Button
                        disabled={disabled}
                        text='submit'
                        method={editUser}
                        loading={loading}
                        showMessage={true}
                        message={message}
                        changeMessage={setMessage}
                        buttonStyle={styles.button}
                        messageStyle={success ? styles.messageSuccess : styles.messageFail}
                    />
                </form>
            </div>
        </Modal>
    )
}

export default EditUserModal