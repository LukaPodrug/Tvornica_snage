import { useState } from 'react'
import moment from 'moment'

import Section from '../section'
import TrainingDetailsModal from '../../pages/modals/training/details'
import EditTrainingDetailsModal from '../../pages/modals/training/edit/details'
import EditTrainingAttendanceModal from '../../pages/modals/training/edit/attendance'
import TrainingReservationsModal from '../../pages/modals/training/reservations'
import styles from './style.module.css'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import roomIcon from '../../assets/icons/room.png'
import capacityIcon from '../../assets/icons/capacity.png'
import levelIcon from '../../assets/icons/level.png'
import moreIcon from '../../assets/icons/more.png'
import editIcon from '../../assets/icons/edit.png'
import usersIcon from '../../assets/icons/users.png'

function Training({ id, showCoach, coachImage, coachId, coachFirstName, coachLastName, start, finish, room, capacity, level, title, regime, exercises, trainingEdited, changeTrainingEdited }) {
    const [trainingDetailsModalOpen, setTrainingDetailsModalOpen] = useState(false)
    const [editTrainingDetailsModalOpen, setEditTrainingDetailsModalOpen] = useState(false)
    const [editTrainingAttendanceModalOpen, setEditTrainingAttendanceModalOpen] = useState(false)
    const [trainingReservationsModalOpen, setTrainingReservationsModalOpen] = useState(false)

    function openEditTrainingModal() {
        if(new Date(Date.now()) < new Date(start)) {
            setEditTrainingDetailsModalOpen(true)
        }
        else {
            setEditTrainingAttendanceModalOpen(true)
        }
    }

    return (
        <div
            className={styles.wrapper}
        >
            <div className={styles.data}>
                <Section
                    image={calendarIcon}
                    property='date'
                    value={moment(start).format('DD/MM/YYYY')}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                {
                    showCoach && 
                        <Section
                            image={coachImage}
                            property='coach'
                            value={coachLastName}
                            button={false}
                            showText={true}
                            openModal={null}
                        />
                }
                <Section
                    image={startIcon}
                    property='start'
                    value={moment(start).format('HH:mm')}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={finishIcon}
                    property='finish'
                    value={moment(finish).format('HH:mm')}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={roomIcon}
                    property='room'
                    value={room}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={capacityIcon}
                    property='capacity'
                    value={capacity}
                    button={false}
                    showText={true}
                    openModal={null}
                />
                <Section
                    image={levelIcon}
                    property='level'
                    value={level}
                    button={false}
                    showText={true}
                    openModal={null}
                />
            </div>
            <div className={styles.buttons}>
                <Section
                    image={moreIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={setTrainingDetailsModalOpen}
                />
                <Section
                    image={editIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={openEditTrainingModal}
                />
                <Section
                    image={usersIcon}
                    property={null}
                    value={null}
                    button={true}
                    showText={false}
                    openModal={setTrainingReservationsModalOpen}
                />
            </div>
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
                title={title}
                regime={regime}
                exercises={exercises}
            />
            {
                editTrainingDetailsModalOpen &&
                    <EditTrainingDetailsModal
                        isOpen={true}
                        changeIsOpen={setEditTrainingDetailsModalOpen}
                        id={id}
                        coachIdOld={coachId}
                        dateOld={moment(start).format('DD/MM/YYYY')}
                        startOld={moment(start).format('HH:mm')}
                        finishOld={moment(finish).format('HH:mm')}
                        roomOld={room}
                        capacityOld={capacity}
                        levelOld={level}
                        titleOld={title}
                        regimeOld={regime}
                        exercisesOld={exercises}
                        trainingEdited={trainingEdited}
                        changeTrainingEdited={changeTrainingEdited}
                    />
            }
            {
                editTrainingAttendanceModalOpen &&
                    <EditTrainingAttendanceModal
                        isOpen={true}
                        changeIsOpen={setEditTrainingAttendanceModalOpen}
                        id={id}
                    />
            }
            <TrainingReservationsModal
                isOpen={trainingReservationsModalOpen}
                changeIsOpen={setTrainingReservationsModalOpen}
                id={id}
            />
        </div>
    )
}

export default Training