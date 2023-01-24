import { useState } from 'react'

import Button from '../../../components/button'
import DatePicker from '../../../components/datePicker'
import AddTrainingModal from '../../../pages/modals/training/add'
import styles from './style.module.css'

function TrainingsSectionHeader({ title, dateShow, date, setDate }) {
    const [addTrainingModalOpen, setAddTrainingModalOpen] = useState(false)

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.header}
            >
                <label
                    className={styles.text}
                >
                    {title}
                </label>
                <Button
                    text='add new'
                    method={() => setAddTrainingModalOpen(true)}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={() => {}}
                    style={styles.button}
                />
            </div>
            <DatePicker
                dateShow={dateShow}
                date={date}
                setDate={setDate}
            />
            <AddTrainingModal
                isOpen={addTrainingModalOpen}
                setIsOpen={setAddTrainingModalOpen}
            />
        </div>
    )
}

export default TrainingsSectionHeader