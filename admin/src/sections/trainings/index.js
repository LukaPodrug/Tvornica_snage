import Training from '../../components/training'
import styles from './style.module.css'

function TrainingsSection({ trainings, showCoach, trainingEdited, changeTrainingEdited }) {
    return (
        <div
            className={styles.wrapper}
        >
        {
            trainings.length === 0 ?
                <label
                    className={styles.message}
                >
                    no scheduled trainings for this date
                </label>
                :
                trainings.map((training, index) => {
                    return (
                        <Training
                            key={index}
                            id={training.id}
                            programImage={training.programImage}
                            showCoach={showCoach}
                            coachId={training.coachId}
                            coachImage={training.coachImage}
                            coachFirstName={training.coachFirstName}
                            coachLastName={training.coachLastName}
                            start={training.start}
                            finish={training.finish}
                            room={training.room}
                            capacity={training.capacity}
                            level={training.level}
                            programId={training.programId}
                            programName={training.programName}
                            regime={training.regime}
                            exercises={training.exercises}
                            trainingEdited={trainingEdited}
                            changeTrainingEdited={changeTrainingEdited}
                        />
                    )
                })
        }
        </div>
    )
}

export default TrainingsSection