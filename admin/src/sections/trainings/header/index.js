import { useState } from 'react'

import Button from '../../../components/button'
import DatePicker from '../../../components/datePicker'
import AddTrainingModal from '../../../pages/modals/training/add'
import styles from './style.module.css'

function TrainingsSectionHeader({ title, dateShow, date, changeDate, newTrainingAdded, changeNewTrainingAdded }) {
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
                    disabled={false}
                    text='add new'
                    method={() => setAddTrainingModalOpen(true)}
                    loading={false}
                    showMessage={false}
                    message={null}
                    changeMessage={() => {}}
                    buttonStyle={styles.button}
                    messageStyle={null}
                />
            </div>
            <DatePicker
                dateShow={dateShow}
                date={date}
                setDate={changeDate}
            />
            <AddTrainingModal
                isOpen={addTrainingModalOpen}
                changeIsOpen={setAddTrainingModalOpen}
                newTrainingAdded={newTrainingAdded}
                changeNewTrainingAdded={changeNewTrainingAdded}
            />
        </div>
    )
}

export default TrainingsSectionHeader