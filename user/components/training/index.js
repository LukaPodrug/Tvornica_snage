import { useState } from 'react'
import { View } from 'react-native'
import { useRecoilState } from 'recoil'

import store from '../../store'
import TrainingSection from './section'
import TrainingCapacity from './capacity'
import TrainingButton from './button'
import TrainingDetailsModal from '../../pages/modals/training/details'
import { addReservationAPI, removeReservationAPI } from '../../API/REST/reservation'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import moreIcon from '../../assets/icons/more.png'
import addReservationIcon from '../../assets/icons/registration.png'
import removeReservationIcon from '../../assets/icons/remove.png'

function Training({ trainingPage, dateReservation, id, programImage, reserved, date, coachImage, coachFirstName, coachLastName, start, finish, numberOfReservations, room, capacity, level, title, regime, exercises, startDate, reservationUpdated, changeReservationUpdated, changeLoading, wrapperStyle, dataWrapperStyle, menuWrapperStyle, sectionWrapperStyle, coachSectionWrapperStyle, programSectionWrapperStyle, sectionImageStyle, coachSectionImageStyle, sectionPropertyTextStyle, sectionValueTextStyle, capacitySectionWrapper, buttonWrapperStyle, buttonWrapperDisabledStyle, buttonWrapperHiddenStyle, buttonIconStyle, detailsModalWrapperStyle, detailsModalHeaderWrapperStyle, detailsModalTitleTextStyle, detailsModalExitButtonWrapperStyle, detailsModalExitButtonTextStyle, detailsModalDataRowWrapperStyle, detailsModalDataHalfRowWrapperStyle, detailsModalDataWholeRowWrapperStyle, detailsModalDataPropertyTextStyle, detailsModalDataValueTextStyle }) {
    const [token] = useRecoilState(store.token)
    const [ownData] = useRecoilState(store.ownData)
    const [trainingDetailsModalOpen, setTrainingDetailsModalOpen] = useState(false)

    function openTrainingDetailsModal() {
        setTrainingDetailsModalOpen(true)
    }

    function closeTrainingDetailsModal() {
        setTrainingDetailsModalOpen(false)
    }

    async function addReservation() {
        try {
            changeLoading(true)
            await addReservationAPI(token, id)
            changeReservationUpdated(!reservationUpdated)
        }
        catch(error) {
            return
        }
    }

    async function removeReservation() {
        try {
            changeLoading(true)
            await removeReservationAPI(token, id)
            changeReservationUpdated(!reservationUpdated)
        }
        catch(error) {
            return
        }
    }

    return (
        <View
            style={wrapperStyle}
        >
            <View
                style={dataWrapperStyle}
            >
                <TrainingSection
                    showText={false}
                    image={programImage}
                    property={null}
                    value={null}
                    wrapperStyle={[sectionWrapperStyle, programSectionWrapperStyle]}
                    imageStyle={sectionImageStyle}
                    propertyTextStyle={null}
                    valueTextStyle={null}
                />
                {     
                    !trainingPage &&   
                        <TrainingSection
                            showText={true}
                            image={calendarIcon}
                            property='date'
                            value={date}
                            wrapperStyle={sectionWrapperStyle}
                            imageStyle={sectionImageStyle}
                            propertyTextStyle={sectionPropertyTextStyle}
                            valueTextStyle={sectionValueTextStyle}
                        />
                }
                <TrainingSection
                    showText={true}
                    image={coachImage}
                    property='coach'
                    value={coachLastName}
                    wrapperStyle={[sectionWrapperStyle, coachSectionWrapperStyle]}
                    imageStyle={[sectionImageStyle, coachSectionImageStyle]}
                    propertyTextStyle={sectionPropertyTextStyle}
                    valueTextStyle={sectionValueTextStyle}
                />
                <TrainingSection
                    showText={true}
                    image={startIcon}
                    property='start'
                    value={start}
                    wrapperStyle={sectionWrapperStyle}
                    imageStyle={sectionImageStyle}
                    propertyTextStyle={sectionPropertyTextStyle}
                    valueTextStyle={sectionValueTextStyle}
                />
                <TrainingSection
                    showText={true}
                    image={finishIcon}
                    property='finish'
                    value={finish}
                    wrapperStyle={sectionWrapperStyle}
                    imageStyle={sectionImageStyle}
                    propertyTextStyle={sectionPropertyTextStyle}
                    valueTextStyle={sectionValueTextStyle}
                />
                {
                    trainingPage &&
                        <TrainingCapacity
                            numberOfReservations={numberOfReservations}
                            capacity={capacity}
                            wrapperStyle={capacitySectionWrapper}
                            propertyTextStyle={sectionPropertyTextStyle}
                            valueTextStyle={sectionValueTextStyle}
                        />
                }
            </View>
            <View
                style={menuWrapperStyle}
            >
                <TrainingButton
                    work={openTrainingDetailsModal}
                    image={moreIcon}
                    disabled={false}
                    wrapperStyle={buttonWrapperStyle}
                    wrapperDisabledStyle={null}
                    iconStyle={buttonIconStyle}
                />
                {
                    reserved ?
                        <TrainingButton
                            work={removeReservation}
                            image={removeReservationIcon}
                            disabled={new Date(Date.now()) > new Date(startDate)}
                            wrapperStyle={[buttonWrapperStyle, new Date(Date.now()) > new Date(startDate) && buttonWrapperHiddenStyle]}
                            wrapperDisabledStyle={buttonWrapperDisabledStyle}
                            iconStyle={buttonIconStyle}
                        />
                        :
                        <TrainingButton
                            work={addReservation}
                            image={addReservationIcon}
                            disabled={dateReservation || new Date(Date.now()) > new Date(startDate) || numberOfReservations === capacity || new Date(new Date(ownData.membership).getTime() + 7*24*60*60*1000) < new Date(startDate)}
                            wrapperStyle={[buttonWrapperStyle, new Date(Date.now()) > new Date(startDate) && buttonWrapperHiddenStyle]}
                            wrapperDisabledStyle={buttonWrapperDisabledStyle}
                            iconStyle={buttonIconStyle}
                        />
                }
            </View>
            <TrainingDetailsModal
                isOpen={trainingDetailsModalOpen}
                close={closeTrainingDetailsModal}
                coachFirstName={coachFirstName}
                coachLastName={coachLastName}
                date={date}
                start={start}
                finish={finish}
                room={room}
                capacity={capacity}
                level={level}
                title={title}
                regime={regime}
                exercises={exercises}
                wrapperStyle={detailsModalWrapperStyle}
                headerWrapperStyle={detailsModalHeaderWrapperStyle}
                titleTextStyle={detailsModalTitleTextStyle}
                exitButtonWrapperStyle={detailsModalExitButtonWrapperStyle}
                exitButtonTextStyle={detailsModalExitButtonTextStyle}
                dataRowWrapperStyle={detailsModalDataRowWrapperStyle}
                dataHalfRowWrapperStyle={detailsModalDataHalfRowWrapperStyle}
                dataWholeRowWrapperStyle={detailsModalDataWholeRowWrapperStyle}
                dataPropertyTextStyle={detailsModalDataPropertyTextStyle}
                dataValueTextStyle={detailsModalDataValueTextStyle}
            />
        </View>
    )
}

export default Training