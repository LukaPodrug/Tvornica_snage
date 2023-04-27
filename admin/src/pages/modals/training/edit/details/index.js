import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'
import moment from 'moment'

import store from '../../../../../store'
import ModalHeader from '../../../../../sections/modals/header'
import DropdownInput from '../../../../../components/input/dropdown'
import TextInput from '../../../../../components/input/text'
import DateInput from '../../../../../components/input/date'
import TimeInput from '../../../../../components/input/time'
import NumberInput from '../../../../../components/input/number'
import TextareaInput from '../../../../../components/input/textarea'
import Button from '../../../../../components/button'
import { editTrainingAPI } from '../../../../../API/training'
import styles from './style.module.css'
import '../../../style.css'

function EditTrainingDetailsModal({ isOpen, changeIsOpen, id, coachIdOld, dateOld, startOld, finishOld, roomOld, capacityOld, levelOld, titleOld, regimeOld, exercisesOld, trainingEdited, changeTrainingEdited }) {
    const [token] = useRecoilState(store.token)
    const [allCoachesData] = useRecoilState(store.allCoachesData)

    const [coachIdRecieved, setCoachIdRecieved] = useState(coachIdOld)
    const [dateRecieved, setDateRecieved] = useState(dateOld)
    const [startRecieved, setStartRecieved] = useState(startOld)
    const [finishRecieved, setFinishRecieved] = useState(finishOld)
    const [roomRecieved, setRoomRecieved] = useState(roomOld)
    const [capacityRecieved, setCapacityRecieved] = useState(capacityOld)
    const [levelRecieved, setLevelRecieved] = useState(levelOld)
    const [titleRecieved, setTitleRecieved] = useState(titleOld)
    const [regimeRecieved, setRegimeRecieved] = useState(regimeOld)
    const [exercisesRecieved, setExercisesRecieved] = useState(exercisesOld)

    const [coachId, setCoachId] = useState(coachIdOld)
    const [date, setDate] = useState(dateOld)
    const [start, setStart] = useState(startOld)
    const [finish, setFinish] = useState(finishOld)
    const [room, setRoom] = useState(roomOld)
    const [capacity, setCapacity] = useState(capacityOld)
    const [level, setLevel] = useState(levelOld)
    const [title, setTitle] = useState(titleOld)
    const [regime, setRegime] = useState(regimeOld)
    const [exercises, setExercises] = useState(exercisesOld)

    const [coachIdError, setCoachIdError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [startError, setStartError] = useState(false)
    const [finishError, setFinishError] = useState(false)
    const [roomError, setRoomError] = useState(false)
    const [capacityError, setCapacityError] = useState(false)
    const [levelError, setLevelError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [regimeError, setRegimeError] = useState(false)
    const [exercisesError, setExercisesError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(coachId === coachIdRecieved && date === dateRecieved && start === startRecieved && finish === finishRecieved && room === roomRecieved && capacity === capacityRecieved && level === levelRecieved && title === titleRecieved && regime === regimeRecieved && exercises === exercisesRecieved) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [coachId, date, start, finish, room, capacity, level, title, regime, exercises])

    function resetRecievedValues() {
        setCoachIdRecieved(coachId)
        setDateRecieved(date)
        setStartRecieved(start)
        setFinishRecieved(finish)
        setRoomRecieved(room)
        setCapacityRecieved(capacity)
        setLevelRecieved(level)
        setTitleRecieved(title)
        setRegimeRecieved(regime)
        setExercisesRecieved(exercises)
    }

    async function editTraining() {
        if(coachId === '') {
            setCoachIdError(true)
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
        if(date !== '' && !moment(date, 'DD/MM/YYYY', true).isValid()) {
            setMessage('date format not correct')
            return
        }
        if(start !== '' && !moment(start, 'HH:mm', true).isValid()) {
            setMessage('start format not correct')
            return
        }
        if(finish !== '' && !moment(finish, 'HH:mm', true).isValid()) {
            setMessage('finish format not correct')
            return
        }
        if(capacity < 1) {
            setMessage('capacity value wrong')
            return
        }
        if(coachId !== '' && date !== '' && start !== '' && finish !== '' && room !== '' && capacity !== '' && level !== '' && title !== '' && regime !== '' && exercises !== '') {
            try {
                setLoading(true)
                const startFormatted = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + start
                const finishFormatted = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + finish
                const addTrainingResponse = await editTrainingAPI(token, id, coachId, startFormatted, finishFormatted, room, capacity, level, title, regime, exercises)
                setMessage(addTrainingResponse.data)
                setSuccess(true)
                resetRecievedValues()
                setLoading(false)
                changeTrainingEdited(!trainingEdited)
            }
            catch(error) {
                setSuccess(false)
                setMessage(error.response.data)
                setLoading(false)
                return
            }
        }
    }

    function clearForm() {
        setCoachId('')
        setCoachIdError(false)
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
    }

    function closeModal() {
        setMessage(null)
        clearForm()
        changeIsOpen(false)
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
                    title='edit training details'
                    closeModal={closeModal}
                />
                <form
                    className={styles.form}
                >
                    <div 
                        className={styles.inputs}
                    >
                        <DropdownInput
                            label='coach'
                            person={true}
                            choices={allCoachesData}
                            value={coachId}
                            changeValue={setCoachId}
                            error={coachIdError}
                            changeError={setCoachIdError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <DateInput
                            label='date'
                            showPlaceholder={true}
                            placeholder='dd/mm/yyyy'
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
                            showPlaceholder={true}
                            placeholder='hh:mm'
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
                            showPlaceholder={true}
                            placeholder='hh:mm'
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
                            owLimit={1}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <DropdownInput
                            label='level'
                            person={false}
                            choices={[1, 2, 3]}
                            value={level}
                            changeValue={setLevel}
                            error={levelError}
                            changeError={setLevelError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                        <TextInput
                            label='title'
                            showPlaceholder={false}
                            placeholder=''
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
                </form>
                <Button
                    disabled={disabled}
                    text='submit'
                    method={loading ? () => {} : () => editTraining()}
                    loading={loading}
                    showMessage={true}
                    message={message}
                    changeMessage={setMessage}
                    buttonStyle={styles.button}
                    messageStyle={success ? styles.messageSuccess : styles.messageFail}
                />
            </div>
        </Modal>
    )
}

export default EditTrainingDetailsModal