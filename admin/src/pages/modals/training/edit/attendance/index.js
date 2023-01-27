import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'
import moment from 'moment'

import store from '../../../../../store'
import LoadingSection from '../../../../../sections/loading'
import ModalHeader from '../../../../../sections/modals/header'
import Menu from '../../../../../components/menu'
import UsersSection from '../../../../../sections/users'
import Pagination from '../../../../../components/pagination'
import { getReservationsByTrainingIdAPI, editReservationCompletion } from '../../../../../API/reservation'
import styles from './style.module.css'
import '../../../style.css'

function EditTrainingAttendanceModal({ isOpen, changeIsOpen, id }) {
    const tabs = ['reservations', 'unannounced']

    const [token] = useRecoilState(store.token)

    const [activeTab, setActiveTab] = useState(0)
    const [reservationsByTrainingId, setReservationsByTrainingId] = useState(null)
    const [toggled, setToggled] = useState(null)
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [reservationEdited, setReservationEdited] = useState(false)

    const [reservationsLoading, setReservationsLoading] = useState(true)

    useEffect(() => {
        async function getReservationsByTrainingId() {
            try {
                const getReservationsByTrainingIdResponse = await getReservationsByTrainingIdAPI(token, id)
                const toggledHelp = []
                getReservationsByTrainingIdResponse.data.forEach(reservation => {
                    toggledHelp.push(reservation.completion)
                })
                setToggled(toggledHelp)
                setReservationsByTrainingId(getReservationsByTrainingIdResponse.data)
                setMaxPage(Math.ceil(getReservationsByTrainingIdResponse.data.length / 5))
            }
            catch(error) {
                return
            }
        }

        async function fetchAPI() {
            setReservationsLoading(true)
            await getReservationsByTrainingId()
            setTimeout(() => {
                setReservationsLoading(false)
            }, 500)
        }

        fetchAPI()
    }, [reservationEdited])

    async function changeToggled(index) {
        try {
            const toggledHelp = [...toggled]
            toggledHelp[index] = !toggled[index]
            setToggled(toggledHelp)
            setTimeout(async () => {
                await editReservationCompletion(token, reservationsByTrainingId[index].trainingId, reservationsByTrainingId[index].userId, !(reservationsByTrainingId[index].completion))
                setReservationEdited(!reservationEdited)
            }, 200)
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
                    reservationsLoading ?
                        <LoadingSection/>
                        :
                        <UsersSection
                            users={reservationsByTrainingId.slice((page - 1) * 5, (page - 1) * 5 + 5)}
                            toggled={toggled.slice((page - 1) * 5, (page - 1) * 5 + 5)}
                            changeToggled={changeToggled}
                            reduced={true}
                            page={page}
                            message='no reservations for this training'
                            userEdited={null}
                            changeUserEdited={null}
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