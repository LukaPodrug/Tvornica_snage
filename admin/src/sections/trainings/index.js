import Training from '../../components/training'
import styles from './style.module.css'

function TrainingsSection({ trainings, showCoach }) {
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
                            showCoach={showCoach}
                            coachId={training.coach_id}
                            coachImage={training.coachImage}
                            coachFirstName={training.coachFirstName}
                            coachLastName={training.coachLastName}
                            start={training.start}
                            finish={training.finish}
                            room={training.room}
                            capacity={training.capacity}
                            level={training.level}
                            description={training.description}
                        />
                    )
                })
        }
        </div>
    )
}

export default TrainingsSection