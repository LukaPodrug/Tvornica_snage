import { useState } from 'react'
import moment from 'moment'

import Section from './section'
import TrainingDetailsModal from '../../pages/modals/training/details'
import styles from './style.module.css'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import roomIcon from '../../assets/icons/room.png'
import capacityIcon from '../../assets/icons/capacity.png'
import levelIcon from '../../assets/icons/level.png'
import moreIcon from '../../assets/icons/more.png'
import editIcon from '../../assets/icons/edit.png'

function Training({ id, showCoach, coachImage, coachId, coachFirstName, coachLastName, start, finish, room, capacity, level, description }) {
    const [trainingDetailsModalOpen, setTrainingDetailsModalOpen] = useState(false)

    return (
        <div
            className={styles.wrapper}
        >
            <Section
                image={calendarIcon}
                property='date'
                value={moment(start).format('DD/MM/YYYY')}
                button={false}
                method={null}
            />
            {
                showCoach && 
                    <Section
                        image={coachImage}
                        property='coach'
                        value={coachLastName}
                        button={false}
                        method={null}
                    />
            }
            <Section
                image={startIcon}
                property='start'
                value={moment(start).format('HH:mm')}
                button={false}
                method={null}
            />
            <Section
                image={finishIcon}
                property='finish'
                value={moment(finish).format('HH:mm')}
                button={false}
                method={null}
            />
            <Section
                image={roomIcon}
                property='room'
                value={room}
                button={false}
                method={null}
            />
            <Section
                image={capacityIcon}
                property='capacity'
                value={capacity}
                button={false}
                method={null}
            />
            <Section
                image={levelIcon}
                property='level'
                value={level}
                button={false}
                method={null}
            />
            <Section
                image={moreIcon}
                button={true}
                openModal={setTrainingDetailsModalOpen}
            />
            <Section
                image={editIcon}
                button={true}
                method={null}
            />
            <TrainingDetailsModal
                isOpen={trainingDetailsModalOpen}
                changeIsOpen={setTrainingDetailsModalOpen}
                coachFirstName={coachFirstName}
                coachLastName={coachLastName}
                date={moment(start).format('DD/MM/YYYY')}
                start={moment(start).format('HH:mm')}
                finish={moment(finish).format('HH:mm')}
                room={room}
                capacity={capacity}
                level={level}
                title={description}
                regime={description}
                exercises={description}
            />
        </div>
    )
}

export default Training