import { useState } from 'react'

import Section from '../section'
import EditPartnerModal from '../../pages/modals/partner/edit'
import DeletePartnerModal from '../../pages/modals/partner/delete'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'

function Partner({ id, name, link, partnerEdited, changePartnerEdited, partnerDeleted, changePartnerDeleted }) {
    const [editPartnerModalOpen, setEditPartnerModalOpen] = useState(false)
    const [deletePartnerModalOpen, setDeletePartnerModalOpen] = useState(false)

    function openEditPartnerModal() {
        setEditPartnerModalOpen(true)
    }

    function openDeletePartnerModal() {
        setDeletePartnerModalOpen(true)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    image={null}
                    property={null}
                    value={name}
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
                    openModal={openEditPartnerModal}
                />
                <Section
                    image={deleteIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={openDeletePartnerModal}
                />
            </div>
            {
                editPartnerModalOpen &&
                    <EditPartnerModal
                        isOpen={true}
                        changeIsOpen={setEditPartnerModalOpen}
                        id={id}
                        nameOld={name}
                        linkOld={link}
                        partnerEdited={partnerEdited}
                        changePartnerEdited={changePartnerEdited}
                    />
            }
            {
                deletePartnerModalOpen &&
                    <DeletePartnerModal
                        isOpen={true}
                        changeIsOpen={setDeletePartnerModalOpen}
                        id={id}
                        partnerDeleted={partnerDeleted}
                        changePartnerDeleted={changePartnerDeleted}
                    />
            }
        </div>
    )
}

export default Partner