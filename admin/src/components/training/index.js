import moment from 'moment'

import styles from './style.module.css'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import roomIcon from '../../assets/icons/room.png'
import capacityIcon from '../../assets/icons/capacity.png'
import levelIcon from '../../assets/icons/level.png'
import moreIcon from '../../assets/icons/more.png'
import editIcon from '../../assets/icons/edit.png'

function Training({ id, coachImage, coachId, coachLastName, start, finish, room, capacity, level, description }) {
    return (
        <div
            className={styles.wrapper}
        >
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={calendarIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    date
                </label>
                <label
                    className={styles.value}
                >
                    {moment(start).format('DD/MM/YYYY')}
                </label>
            </div>
            <div
                className={styles.section}
            >
                <div
                    className={styles.image}
                >
                    <img
                        src={coachImage}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    coach
                </label>
                <label
                    className={styles.value}
                >
                    {coachLastName}
                </label>
            </div>
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={startIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    start
                </label>
                <label
                    className={styles.value}
                >
                    {moment(start).format('HH:mm')}
                </label>
            </div>
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={finishIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    finish
                </label>
                <label
                    className={styles.value}
                >
                    {moment(finish).format('HH:mm')}
                </label>
            </div>
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={roomIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    room
                </label>
                <label
                    className={styles.value}
                >
                    {room}
                </label>
            </div>
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={capacityIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    capacity
                </label>
                <label
                    className={styles.value}
                >
                    {capacity}
                </label>
            </div>
            <div 
                className={styles.section}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={levelIcon}
                    />
                </div>
                <label
                    className={styles.key}
                >
                    level
                </label>
                <label
                    className={styles.value}
                >
                    {level}
                </label>
            </div>
            <div
                className={styles.section + ' ' + styles.button + ' ' + styles.more}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={moreIcon}
                    />
                </div>
            </div>
            <div
                className={styles.section + ' ' + styles.button + ' ' + styles.edit}
            >
                <div
                    className={styles.icon}
                >
                    <img
                        src={editIcon}
                    />
                </div>
            </div>
        </div>
    )
}

export default Training