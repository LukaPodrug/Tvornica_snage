import { useRecoilState } from 'recoil'
import MoonLoader from 'react-spinners/MoonLoader'

import store from '../../../store'
import Header from './header'
import Training from '../../../components/training'
import Pagination from '../../../components/pagination'
import styles from './style.module.css'

function Trainings({ dateShow, date, setDate, trainings, page, setPage, maxPage, loading }) {
    const [ownData] = useRecoilState(store.ownData)

    return (
        <div
            className={styles.wrapper}
        >
            <Header
                dateShow={dateShow}
                date={date}
                setDate={setDate}
            />
            {
                loading ? 
                    <div
                        className={styles.loading}
                    >
                        <MoonLoader
                            color='#90EE90'
                        />
                    </div>
                    :
                    <div
                        className={styles.trainings}
                    >
                    {
                        trainings.map((training, index) => {
                            return (
                                <Training
                                    key={index}
                                    id={training.id}
                                    showCoach={false}
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
                    {
                        trainings.length === 0 &&
                            <label
                                className={styles.message}
                            >
                                no scheduled trainings for this date
                            </label>
                    }
                    </div>
            }
            <Pagination
                page={page}
                setPage={setPage}
                maxPage={maxPage}
            />
        </div>
    )
}

export default Trainings