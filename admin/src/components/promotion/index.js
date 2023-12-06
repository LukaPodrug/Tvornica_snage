import { useState } from 'react'

import Section from '../section'
import EditPromotionModal from '../../pages/modals/promotion/edit'
import DeletePromotionModal from '../../pages/modals/promotion/delete'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'

function Promotion({ id, partnersData, partnerId, partnerName, code, description, promotionEdited, changePromotionEdited, promotionDeleted, changePromotionDeleted }) {
    const [editPromotionModalOpen, setEditPromotionModalOpen] = useState(false)
    const [deletePromotionModalOpen, setDeletePromotionModalOpen] = useState(false)

    function openEditPromotionModal() {
        setEditPromotionModalOpen(true)
    }

    function openDeletePromotionModal() {
        setDeletePromotionModalOpen(true)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    image={null}
                    property={null}
                    value={partnerName}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={null}
                    property={null}
                    value={code}
                    button={false}
                    showText={true}
                    openModal={null}
                />
            </div>
            <div className={styles.buttons}>
                <Section
                    image={editIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={openEditPromotionModal}
                />
                <Section
                    image={deleteIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={openDeletePromotionModal}
                />
            </div>
            {
                editPromotionModalOpen &&
                    <EditPromotionModal
                        isOpen={true}
                        changeIsOpen={setEditPromotionModalOpen}
                        partnersData={partnersData}
                        id={id}
                        partnerIdOld={partnerId}
                        codeOld={code}
                        descriptionOld={description}
                        promotionEdited={promotionEdited}
                        changePromotionEdited={changePromotionEdited}
                    />
            }
            {
                deletePromotionModalOpen &&
                    <DeletePromotionModal
                        isOpen={true}
                        changeIsOpen={setDeletePromotionModalOpen}
                        id={id}
                        promotionDeleted={promotionDeleted}
                        changePromotionDeleted={changePromotionDeleted}
                    />
            }
        </div>
    )
}

export default Promotion