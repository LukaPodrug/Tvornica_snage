import { useState } from 'react'

import Header from '../../../components/header'
import Button from '../../../components/button'
import DatePicker from '../../../components/datePicker'
import AddTrainingModal from '../../../pages/modals/training/add'
import styles from './style.module.css'

function TrainingsSectionHeader({ title, dateShow, date, dateDay, changeDate, newTrainingAdded, changeNewTrainingAdded, disabled }) {
    const [addTrainingModalOpen, setAddTrainingModalOpen] = useState(false)

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
                dateDay={dateDay}
                setDate={changeDate}
                disabled={disabled}
            />
            <AddTrainingModal
                isOpen={addTrainingModalOpen}
                changeIsOpen={setAddTrainingModalOpen}
                newTrainingAdded={newTrainingAdded}
                changeNewTrainingAdded={changeNewTrainingAdded}
                datePickerDate={dateShow}
            />
        </div>
    )
}

export default TrainingsSectionHeader