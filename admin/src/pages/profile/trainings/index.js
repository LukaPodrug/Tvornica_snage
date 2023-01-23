import { useRecoilState } from 'recoil'

import store from '../../../store'
import Training from '../../../components/training'
import styles from './style.module.css'


function Trainings({ trainings }) {
    const [ownData] = useRecoilState(store.ownData)

    return (
        <div
            className={styles.wrapper}
        >
            {
                trainings.map((training, index) => {
                    return (
                        <Training
                            key={index}
                            id={training.id}
                            coachId={training.coach_id}
                            coachImage={ownData.image}
                            coachLastName={ownData.last_name}
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

export default Trainings