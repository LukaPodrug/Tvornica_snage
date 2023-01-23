import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import LoadingSection from '../../sections/loading'
import TrainingsSectionHeader from '../../sections/trainings/header'
import TrainingsSection from '../../sections/trainings'
import Pagination from '../../components/pagination'
import { getAllCoachesDataAPI } from '../../API/coach'
import { getTrainingsByDateAPI } from '../../API/training'
import styles from './style.module.css'

function TrainingsPage() {
    const [token] = useRecoilState(store.token)
    const [allCoachesData, setAllCoachesData] = useRecoilState(store.allCoachesData)

    const [date, setDate] = useState(Date.now())
    const [trainingsByDate, setTrainingsByDate] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [dateShow, setDateShow] = useState(moment(new Date(date)).format('DD/MM/YYYY'))
    const [loading, setLoading] = useState(true)
    const [trainingsLoading, setTrainingsLoading] = useState(true)

    useEffect(() => {
        async function getAllCoachesData() {
            if(allCoachesData) {
                return
            }
            try {
                const getAllCoachesDataResponse = await getAllCoachesDataAPI(token)
                setAllCoachesData(getAllCoachesDataResponse.data)
            }
            catch(error) {
                return
            }
        }

        async function getTrainingsByDate() {
            try {
                const getTrainingsByDateResponse = await getTrainingsByDateAPI(token, date)
                const trainingsByDateSorted = getTrainingsByDateResponse.data.sort((training1, training2) => new Date(training1.start) - new Date(training2.start))
                trainingsByDateSorted.forEach(training => {
                    allCoachesData.forEach(coach => {
                        if(training.coach_id === coach.id) {
                            training.coachImage = coach.image
                            training.coachLastName = coach.last_name
                            return
                        }
                    })
                })
                setTrainingsByDate(trainingsByDateSorted)
                setMaxPage(Math.ceil(trainingsByDateSorted.length / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            await getAllCoachesData()
            setTrainingsLoading(true)
            await getTrainingsByDate()
            setTimeout(() => {
                setLoading(false)
                setTrainingsLoading(false)
            }, 1000)
        }

        fetchAPI()
    }, [date])

    useEffect(() => {
        setDateShow(moment(new Date(date)).format('DD/MM/YYYY'))
        setPage(1)
    }, [date])

    return (
        <>
            {
                loading ?
                    <LoadingPage/>
                    :
                    <div
                        className={styles.wrapper}
                    >
                        <div 
                            className={styles.window}
                        >
                            <TrainingsSectionHeader
                                title='all trainings'
                                dateShow={dateShow}
                                date={date}
                                setDate={setDate}
                            />
                            {
                                trainingsLoading ? 
                                    <LoadingSection/>
                                    :
                                    <TrainingsSection
                                        trainings={trainingsByDate.slice((page - 1) * 5, (page - 1) * 5 + 5)}
                                        showCoach={true}
                                    />
                            }
                            <Pagination
                                page={page}
                                setPage={setPage}
                                maxPage={maxPage}
                            />
                        </div>
                    </div>
            }
        </>
    )
}

export default TrainingsPage