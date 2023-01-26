import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'
import moment from 'moment'

import store from '../../../../../store'
import LoadingSection from '../../../../../sections/loading'
import ModalHeader from '../../../../../sections/modals/header'
import Menu from '../../../../../components/menu'
import User from '../../../../../components/user'
import Pagination from '../../../../../components/pagination'
import { getReservationsByTrainingIdAPI } from '../../../../../API/reservation'
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
    }, [])

    function changeToggled(index) {
        
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
                        reservationsByTrainingId.slice((page - 1) * 5, (page - 1) * 5 + 5).map((reservation, index) => {
                            return (
                                <User
                                    key={index + (page - 1) * 5}
                                    id={reservation.userId}
                                    image={reservation.image}
                                    firstName={reservation.firstName}
                                    lastName={reservation.lastName}
                                    dateOfBirth={moment(reservation.dateOfBirth).format('DD/MM/YYYY')}
                                    membership={moment(reservation.embership).format('DD/MM/YYYY')}
                                    level={reservation.level}
                                    reduced={true}
                                    toggled={toggled[index + (page - 1) * 5]}
                                    changeToggled={changeToggled}
                                    showToggle={true}
                                    showEdit={false}
                                    index={index + (page - 1) * 5}
                                /> 
                            )
                        })
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