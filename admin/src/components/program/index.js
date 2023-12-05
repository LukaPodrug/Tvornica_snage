import { useState } from 'react'

import Section from '../section'
import EditProgramModal from '../../pages/modals/program/edit'
import styles from './style.module.css'

import editIcon from '../../assets/icons/edit.png'

function Program({ id, name, image, programEdited, changeProgramEdited }) {
    const [editProgramModalOpen, setEditProgramModalOpen] = useState(false)

    function openEditProgramModal() {
        setEditProgramModalOpen(true)
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    image={image}
                    property='image'
                    value={null}
                    button={false}
                    showText={false}
                    openModal={null}
                />
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
                    openModal={openEditProgramModal}
                />
            </div>
            {
                editProgramModalOpen &&
                    <EditProgramModal
                        isOpen={true}
                        changeIsOpen={setEditProgramModalOpen}
                        id={id}
                        nameOld={name}
                        imageOld={image}
                        programEdited={programEdited}
                        changeProgramEdited={changeProgramEdited}
                    />
            }
        </div>
    )
}

export default Program