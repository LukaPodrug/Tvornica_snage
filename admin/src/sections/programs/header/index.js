import { useState } from 'react'

import Header from '../../../components/header'
import Button from '../../../components/button'
import AddProgramModal from '../../../pages/modals/program/add'
import styles from './style.module.css'

function ProgramsSectionHeader({ title, newProgramAdded, changeNewProgramAdded }) {
    const [addProgramModalOpen, setAddProgramModalOpen] = useState(false)

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
                    method={() => setAddProgramModalOpen(true)}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={() => {}}
                    buttonStyle={styles.button}
                    messageStyle={null}
                />
            </div>
            <AddProgramModal
                isOpen={addProgramModalOpen}
                changeIsOpen={setAddProgramModalOpen}
                newProgramAdded={newProgramAdded}
                changeNewProgramAdded={changeNewProgramAdded}
            />
        </div>
    )
}

export default ProgramsSectionHeader