import { useState } from 'react'

import Header from '../../../components/header'
import Button from '../../../components/button'
import AddPromotionModal from '../../../pages/modals/promotion/add'
import styles from './style.module.css'

function PromotionsSectionHeader({ title, partnersData, newPromotionAdded, changeNewPromotionAdded }) {
    const [addPromotionModalOpen, setAddPromotionModalOpen] = useState(false)

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
                    method={() => setAddPromotionModalOpen(true)}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={() => {}}
                    buttonStyle={styles.button}
                    messageStyle={null}
                />
            </div>
            <AddPromotionModal
                isOpen={addPromotionModalOpen}
                changeIsOpen={setAddPromotionModalOpen}
                partnersData={partnersData}
                newPromotionAdded={newPromotionAdded}
                changeNewPromotionAdded={changeNewPromotionAdded}
            />
        </div>
    )
}

export default PromotionsSectionHeader