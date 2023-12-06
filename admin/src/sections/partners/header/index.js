import { useState } from 'react'

import Header from '../../../components/header'
import Button from '../../../components/button'
import AddPartnerModal from '../../../pages/modals/partner/add'
import styles from './style.module.css'

function PartnersSectionHeader({ title, newPartnerAdded, changeNewPartnerAdded }) {
    const [addPartnerModalOpen, setAddPartnerModalOpen] = useState(false)

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.header}
            >
                <Header
                    title={title}
                    style={null}
                />
                <Button
                    disabled={false}
                    text='add new'
                    method={() => setAddPartnerModalOpen(true)}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={() => {}}
                    buttonStyle={styles.button}
                    messageStyle={null}
                />
            </div>
            <AddPartnerModal
                isOpen={addPartnerModalOpen}
                changeIsOpen={setAddPartnerModalOpen}
                newPartnerAdded={newPartnerAdded}
                changeNewPartnerAdded={changeNewPartnerAdded}
            />
        </div>
    )
}

export default PartnersSectionHeader