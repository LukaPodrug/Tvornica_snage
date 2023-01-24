import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import DateInput from '../../../../components/input/date'
import NumberInput from '../../../../components/input/number'
import TimeInput from '../../../../components/input/time'
import DropdownInput from '../../../../components/input/dropdown'
import TextInput from '../../../../components/input/text'
import TextareaInput from '../../../../components/input/textarea'
import Button from '../../../../components/button'
import styles from './style.module.css'
import '../../style.css'

function AddTrainingModal({ isOpen, setIsOpen }) {
    const [token] = useRecoilState(store.token)
    const [allCoachesData] = useRecoilState(store.allCoachesData)

    const [coach, setCoach] = useState('')
    const [date, setDate] = useState('')
    const [start, setStart] = useState('')
    const [finish, setFinish] = useState('')
    const [room, setRoom] = useState('')
    const [capacity, setCapacity] = useState('')
    const [level, setLevel] = useState('')
    const [title, setTitle] = useState('')
    const [regime, setRegime] = useState('')
    const [exercises, setExercises] = useState('')

    const [coachError, setCoachError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [startError, setStartError] = useState(false)
    const [finishError, setFinishError] = useState(false)
    const [roomError, setRoomError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)
    const [levelError, setLevelError] = useState(false)
    const [titleError, setTitleError] = useState(null)
    const [regimeError, setRegimeError] = useState(null)
    const [exercisesError, setExercisesError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    function addTraining() {
        if(coach === '') {
            setCoachError(true)
        }
        if(date === '') {
            setDateError(true)
        }
        if(start === '') {
            setStartError(true)
        }
        if(finish === '') {
            setFinishError(true)
        }
        if(room === '') {
            setRoomError(true)
        }
        if(capacity === '') {
            setCapacityError(true)
        }
        if(level === '') {
            setLevelError(true)
        }
        if(title === '') {
            setTitleError(true)
        }
        if(regime === '') {
            setRegimeError(true)
        }
        if(exercises === '') {
            setExercisesError(true)
        }
    }

    function closeModal() {
        setCoach('')
        setCoachError(false)
        setDate('')
        setDateError(false)
        setStart('')
        setStartError(false)
        setFinish('')
        setFinishError(false)
        setRoom('')
        setRoomError(false)
        setCapacity('')
        setCapacityError(false)
        setLevel('')
        setLevelError(false)
        setTitle('')
        setTitleError(false)
        setRegime('')
        setRegimeError(false)
        setExercises('')
        setExercisesError(false)
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='add new training'
                    closeModal={closeModal}
                />
                <div
                    className={styles.form}
                >
                    <div 
                        className={styles.inputs}
                    >
                        <DropdownInput
                            label='coach'
                            person={true}
                            choices={allCoachesData}
                            value={coach}
                            changeValue={setCoach}
                            error={coachError}
                            changeError={setCoachError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <DateInput
                            label='date'
                            date={date}
                            changeDate={setDate}
                            error={dateError}
                            changeError={setDateError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TimeInput
                            label='start'
                            time={start}
                            changeTime={setStart}
                            error={startError}
                            changeError={setStartError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TimeInput
                            label='finish'
                            time={finish}
                            changeTime={setFinish}
                            error={finishError}
                            changeError={setFinishError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <DropdownInput
                            label='room'
                            person={false}
                            choices={[1, 2, 3]}
                            value={room}
                            changeValue={setRoom}
                            error={roomError}
                            changeError={setRoomError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <NumberInput
                            label='capacity'
                            number={capacity}
                            changeNumber={setCapacity}
                            error={capacityError}
                            changeError={setCapacityError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <NumberInput
                            label='level'
                            number={level}
                            changeNumber={setLevel}
                            error={levelError}
                            changeError={setLevelError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextInput
                            label='title'
                            text={title}
                            changeText={setTitle}
                            error={titleError}
                            changeError={setTitleError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextareaInput
                            label='regime'
                            text={regime}
                            changeText={setRegime}
                            error={regimeError}
                            changeError={setRegimeError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextareaInput
                            label='exercises'
                            text={exercises}
                            changeText={setExercises}
                            error={exercisesError}
                            changeError={setExercisesError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                    </div>
                </div>
                <Button
                    text='submit'
                    method={() => addTraining()}
                    loading={loading}
                    showMessage={true}
                    message={message}
                    changeMessage={setMessage}
                    style={styles.button}
                />
            </div>
        </Modal>
    )
}

export default AddTrainingModal