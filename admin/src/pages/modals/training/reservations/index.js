import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import LoadingSection from '../../../../sections/loading'
import ModalHeader from '../../../../sections/modals/header'
import UsersSection from '../../../../sections/users'
import Pagination from '../../../../components/pagination'
import { getReservationsByTrainingIdAPI } from '../../../../API/reservation'
import styles from './style.module.css'

function TrainingReservationsModal({ isOpen, changeIsOpen, id }) {
    const [token] = useRecoilState(store.token)

    const [reservationsByTrainingId, setReservationsByTrainingId] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    const [reservationsLoading, setReservationsLoading] = useState(true)

    useEffect(() => {
        async function getReservationsByTrainingId() {
            try {
                const getReservationsByTrainingIdResponse = await getReservationsByTrainingIdAPI(token, id)
                setReservationsByTrainingId(getReservationsByTrainingIdResponse.data)
                setMaxPage(determineMaxPage())
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setReservationsLoading(true)
            await getReservationsByTrainingId()
            setReservationsLoading(false)
        }

        fetchAPI()
    }, [isOpen])

    function determineMaxPage() {
        return Math.ceil(reservationsByTrainingId.length / 5)
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='training reservations'
                    closeModal={changeIsOpen}
                />
                {
                    reservationsLoading &&
                        <LoadingSection/>
                }
                {
                    !reservationsLoading &&
                        <UsersSection
                            showNumber={true}
                            startNumber={(page - 1) * 5}
                            users={reservationsByTrainingId.slice((page - 1) * 5, (page - 1) * 5 + 5)}
                            showAwards={false}
                            showToggle={false}
                            toggled={null}
                            changeToggled={() => {}}
                            reduced={false}
                            page={page}
                            showEdit={false}
                            message='no users found'
                            userEdited={false}
                            changeUserEdited={() => {}}
                            showDelete={false}
                            removeReservation={() => {}}
                            showAdd={false}
                            addUser={() => {}}
                            maxUsers={5}
                            style={styles.users}
                        />
                }
                <Pagination
                    page={page}
                    changePage={setPage}
                    maxPage={maxPage}
                    disabled={reservationsLoading}
                />
            </div>
        </Modal>
    )
}

export default TrainingReservationsModal