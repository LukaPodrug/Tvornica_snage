import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import Info from '../../../../components/info'
import TextInput from '../../../../components/input/text'
import NumberInput from '../../../../components/input/number'
import styles from './style.module.css'

function EditUserModal({ isOpen, changeIsOpen, id, image, firstName, lastName, membershipOld, levelOld, userEdited, changeUserEdited }) {
    const [token] = useRecoilState(store.token)

    const [membershipRecieved, setMembershipRecieved] = useState(membershipOld)
    const [levelRecieved, setLevelRecieved] = useState(levelOld)

    const [membership, setMembership] = useState(membershipOld)
    const [level, setLevel] = useState(levelOld)

    const [membershipError, setMembershipError] = useState(membershipOld)
    const [levelError, setLevelError] = useState(levelOld)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

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
                </div>
            </div>
        </Modal>
    )
}

export default EditUserModal