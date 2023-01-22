import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import Profile from './profile'
import { getOwnAPI } from '../../API/coach'
import styles from './style.module.css'

function ProfilePage() {
    const [token] = useRecoilState(store.token)
    const [ownData, setOwnData] = useRecoilState(store.ownData)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getOwn() {
            if(ownData) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                return
            }
            try {
                const getOwnResponse = await getOwnAPI(token)
                setOwnData(getOwnResponse.data[0])
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
            catch(error) {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }

        getOwn()
    }, [])

    return (
        <>
            {
                loading && <LoadingPage/>
            }
            {
                !loading &&
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
                            <div
                                className={styles.trainingsWindow}
                            >
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProfilePage