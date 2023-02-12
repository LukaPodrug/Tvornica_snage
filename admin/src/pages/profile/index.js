import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import DataSection from '../../sections/data'
import LoadingSection from '../../sections/loading'
import TrainingsSectionHeader from '../../sections/trainings/header'
import TrainingsSection from '../../sections/trainings'
import Pagination from '../../components/pagination'
import { getOwnTrainingsByDateAPI } from '../../API/training'
import styles from './style.module.css'

function ProfilePage() {
    const [token] = useRecoilState(store.token)
    const [ownData] = useRecoilState(store.ownData)
    const [allCoachesData] = useRecoilState(store.allCoachesData)

    const [date, setDate] = useState(Date.now())
    const [ownTrainingsByDate, setOwnTrainingsByDate] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [newTrainingAdded, setNewTrainingAdded] = useState(false)
    const [trainingEdited, setTrainingEdited] = useState(false)

    const [dateShow, setDateShow] = useState(moment(new Date(date)).format('DD/MM/YYYY'))
    const [trainingsLoading, setTrainingsLoading] = useState(true)

    useEffect(() => {
        async function getOwnTrainingsByDate() {
            try {
                const getOwnTrainingsByDateResponse = await getOwnTrainingsByDateAPI(token, date)
                const ownTrainingsByDateSorted = getOwnTrainingsByDateResponse.data.sort((training1, training2) => new Date(training1.start) - new Date(training2.start))
                ownTrainingsByDateSorted.forEach(training => {
                    training.coachFirstName = ownData.firstName
                    training.coachLastName = ownData.lastName
                })
                setOwnTrainingsByDate(ownTrainingsByDateSorted)
                setMaxPage(Math.ceil(ownTrainingsByDateSorted.length / 3))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setTrainingsLoading(true)
            await getOwnTrainingsByDate()
            setTrainingsLoading(false)
        }

        if(ownData && allCoachesData) {
            fetchAPI()
        }
    }, [date, newTrainingAdded, trainingEdited, ownData, allCoachesData])

    useEffect(() => {
        setDateShow(moment(new Date(date)).format('DD/MM/YYYY'))
        setPage(1)
    }, [date])

    return (
        <div
            className={styles.wrapper}
        >
            <div
                className={styles.window}
            >
                <DataSection
                    image={ownData.image}
                    firstName={ownData.firstName}
                    lastName={ownData.lastName}
                    username={ownData.username}
                    dateOfBirth={moment(ownData.dateOfBirth).format('DD/MM/YYYY')}
                />
                <div
                    className={styles.trainings}
                >
                    <TrainingsSectionHeader
                        title='my trainings'
                        dateShow={dateShow}
                        date={date}
                        changeDate={setDate}
                        newTrainingAdded={newTrainingAdded}
                        changeNewTrainingAdded={setNewTrainingAdded}
                    />
                    {
                        trainingsLoading ? 
                            <LoadingSection/>
                            :
                            <TrainingsSection
                                trainings={ownTrainingsByDate.slice((page - 1) * 3, (page - 1) * 3 + 3)}
                                showCoach={false}
                                trainingEdited={trainingEdited}
                                changeTrainingEdited={setTrainingEdited}
                            />
                    }
                    <Pagination
                        page={page}
                        changePage={setPage}
                        maxPage={maxPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage