import moment from 'moment'

import Training from '../../components/training'

function TrainingsSection({ trainings }) {
    return (
        <>
            {
                trainings.map((training, index) => {
                    return (
                        <Training
                            key={index}
                            id={training.id}
                            date={moment(training.start).format('DD/MM')}
                            coachImage={training.coachImage}
                            coachLastName={training.coachLastName}
                            start={moment(training.start).format('HH:mm')}
                            finish={moment(training.finish).format('HH:mm')}
                            numberOfReservations={2}
                            capacity={training.capacity}
                            level={training.level}
                            title={training.title}
                            regime={training.regime}
                            exercises={training.exercises}
                        />
                    )
                })
            }
        </>
    )
}

export default TrainingsSection