import moment from 'moment'

import Section from './section'
import styles from './style.module.css'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import roomIcon from '../../assets/icons/room.png'
import capacityIcon from '../../assets/icons/capacity.png'
import levelIcon from '../../assets/icons/level.png'
import moreIcon from '../../assets/icons/more.png'
import editIcon from '../../assets/icons/edit.png'

function Training({ id, showCoach, coachImage, coachId, coachLastName, start, finish, room, capacity, level, description }) {
    return (
        <div
            className={styles.wrapper}
        >
            <Section
                image={calendarIcon}
                property='date'
                value={moment(start).format('DD/MM/YYYY')}
                button={false}
            />
            {
                showCoach && 
                    <Section
                        image={coachImage}
                        property='coach'
                        value={coachLastName}
                        button={false}
                    />
            }
            <Section
                image={startIcon}
                property='start'
                value={moment(start).format('HH:mm')}
                button={false}
            />
            <Section
                image={finishIcon}
                property='finish'
                value={moment(finish).format('HH:mm')}
                button={false}
            />
            <Section
                image={roomIcon}
                property='room'
                value={room}
                button={false}
            />
            <Section
                image={capacityIcon}
                property='capacity'
                value={capacity}
                button={false}
            />
            <Section
                image={levelIcon}
                property='level'
                value={level}
                button={false}
            />
            <Section
                image={moreIcon}
                button={true}
            />
            <Section
                image={editIcon}
                button={true}
            />
        </div>
    )
}

export default Training