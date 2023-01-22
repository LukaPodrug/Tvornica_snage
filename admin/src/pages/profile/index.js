import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import Profile from './profile'
import Trainings from './trainings'
import { getOwnDataAPI } from '../../API/coach'
import { getOwnTrainingsAPI } from '../../API/training'
import styles from './style.module.css'

function ProfilePage() {
    const [token] = useRecoilState(store.token)
    const [ownData, setOwnData] = useRecoilState(store.ownData)
    const [ownTrainings, setOwnTrainings] = useRecoilState(store.ownTrainings)

    const [loading, setLoading] = useState(true)

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
                const getOwnTrainingsResponse = await getOwnTrainingsAPI(token)
                setOwnTrainings(getOwnTrainingsResponse.data)
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            await getOwnData()
            await getOwnTrainings()
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }

        fetchAPI()
    }, [])

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
                                trainings={ownTrainings}
                            />
                        </div>
                    </div>
            }
        </>
    )
}

export default ProfilePage