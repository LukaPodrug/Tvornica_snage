import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import Profile from './profile'
import Trainings from './trainings'
import { getOwnDataAPI } from '../../API/coach'
import { getOwnTrainingsByDateAPI } from '../../API/training'
import styles from './style.module.css'

function ProfilePage() {
    const [token] = useRecoilState(store.token)
    const [ownData, setOwnData] = useRecoilState(store.ownData)

    const [date, setDate] = useState(Date.now())
    const [ownTrainings, setOwnTrainings] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [dateShow, setDateShow] = useState(moment(new Date(date)).format('DD/MM/YYYY'))
    const [loading, setLoading] = useState(true)
    const [trainingsLoading, setTrainingsLoading] = useState(true)

    useEffect(() => {
        async function getOwnData() {
            if(ownData) {
                return
            }
            try {
                const getOwnDataResponse = await getOwnDataAPI(token)
                setOwnData(getOwnDataResponse.data[0])
            }
            catch(error) {
                return
            }
        }

        async function getOwnTrainings() {
            try {
                const getOwnTrainingsByDateResponse = await getOwnTrainingsByDateAPI(token, date)
                const ownTrainingsByDateSorted = getOwnTrainingsByDateResponse.data.sort((training1, training2) => new Date(training1.start) - new Date(training2.start))
                setOwnTrainings(ownTrainingsByDateSorted)
                setMaxPage(Math.ceil(ownTrainingsByDateSorted.length / 3))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            await getOwnData()
            setTrainingsLoading(true)
            await getOwnTrainings()
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
                            <Profile
                                image={ownData.image}
                                firstName={ownData.first_name}
                                lastName={ownData.last_name}
                                username={ownData.username}
                                dateOfBirth={moment(ownData.date_of_birth).format('DD/MM/YYYY')}
                            />
                            <Trainings
                                dateShow={dateShow}
                                date={date}
                                setDate={setDate}
                                trainings={ownTrainings.slice((page - 1) * 3, (page - 1) * 3 + 3)}
                                page={page}
                                setPage={setPage}
                                maxPage={maxPage}
                                loading={trainingsLoading}
                            />
                        </div>
                    </div>
            }
        </>
    )
}

export default ProfilePage