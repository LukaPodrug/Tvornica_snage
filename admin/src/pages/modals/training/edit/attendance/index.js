import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../../store'
import LoadingSection from '../../../../../sections/loading'
import ModalHeader from '../../../../../sections/modals/header'
import Menu from '../../../../../components/menu'
import ReservationsSection from '../../../../../sections/reservations/reservations'
import UnannouncedSection from '../../../../../sections/reservations/unannounced'
import Pagination from '../../../../../components/pagination'
import { getReservationsByTrainingIdAPI, editReservationCompletionAPI, removeReservationByTrainingIdAndUserIdAPI } from '../../../../../API/reservation'
import styles from './style.module.css'
import '../../../style.css'

function EditTrainingAttendanceModal({ isOpen, changeIsOpen, id }) {
    const tabs = ['reservations', 'unannounced']
    const [token] = useRecoilState(store.token)

    const [activeTab, setActiveTab] = useState(0)
    const [reservationsByTrainingId, setReservationsByTrainingId] = useState(null)
    const [toggled, setToggled] = useState(null)
    const [unannouncedByTrainingId, setUnannouncedByTrainingId] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [reservationEdited, setReservationEdited] = useState(false)

    const [reservationsLoading, setReservationsLoading] = useState(true)

    useEffect(() => {
        async function getReservationsByTrainingId() {
            try {
                const getReservationsByTrainingIdResponse = await getReservationsByTrainingIdAPI(token, id)
                const reservationsHelp = []
                const unannouncedHelp = []
                const toggledHelp = []
                getReservationsByTrainingIdResponse.data.forEach(reservation => {
                    if(reservation.manual) {
                        unannouncedHelp.push(reservation)
                    }
                    else {
                        toggledHelp.push(reservation.completion)
                        reservationsHelp.push(reservation)
                    }
                })
                setToggled(toggledHelp)
                setReservationsByTrainingId(reservationsHelp)
                setUnannouncedByTrainingId(unannouncedHelp)
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
    }, [reservationEdited])

    useEffect(() => {
        setPage(1)
    }, [activeTab])

    function determineMaxPage() {
        if(activeTab === 0) {
            return Math.ceil(reservationsByTrainingId.length / 10)
        }
        else {
            return Math.ceil(unannouncedByTrainingId.length / 8)
        }
    }

    async function changeToggled(index) {
        try {
            const toggledHelp = [...toggled]
            toggledHelp[index] = !toggled[index]
            setToggled(toggledHelp)
            await editReservationCompletionAPI(token, reservationsByTrainingId[index].trainingId, reservationsByTrainingId[index].userId, !(reservationsByTrainingId[index].completion))
            setReservationEdited(!reservationEdited)
        }
        catch(error) {
            return
        }
    }

    async function removeReservationByTrainingIdAndUserId(userId) {
        try {
            await removeReservationByTrainingIdAndUserIdAPI(token, id, userId)
            setReservationEdited(!reservationEdited)
        }
        catch(error) {
            return
        }
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
                    title='edit training attendance'
                    closeModal={changeIsOpen}
                />
                <Menu
                    tabs={tabs}
                    activeTab={activeTab}
                    changeActiveTab={setActiveTab}
                    style={styles.menu}
                />
                {
                    reservationsLoading &&
                        <LoadingSection/>
                }
                {
                    (!reservationsLoading && activeTab === 0) &&
                        <ReservationsSection
                            users={reservationsByTrainingId.slice((page - 1) * 10, (page - 1) * 10 + 10)}
                            toggled={toggled.slice((page - 1) * 10, (page - 1) * 10 + 10)}
                            changeToggled={changeToggled}
                            page={page}
                        />
                }
                {
                    (!reservationsLoading && activeTab === 1) &&
                        <UnannouncedSection
                            allUsers={[...reservationsByTrainingId, ...unannouncedByTrainingId]}
                            users={unannouncedByTrainingId.slice((page - 1) * 8, (page - 1) * 8 + 8)}
                            page={page}
                            removeReservation={removeReservationByTrainingIdAndUserId}
                            reservationEdited={reservationEdited}
                            changeReservationEdited={setReservationEdited}
                            trainingId={id}
                        />
                }
                <Pagination
                    page={page}
                    changePage={setPage}
                    maxPage={maxPage}
                />
            </div>
        </Modal>
    )
}

export default EditTrainingAttendanceModal