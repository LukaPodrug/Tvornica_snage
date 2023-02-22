import { View, Text } from 'react-native'
import moment from 'moment'

import Training from '../../components/training'

function TrainingsSection({ trainings, emptyMessage, reservationUpdated, changeReservationUpdated, changeLoading, emptyMessageWrapperStyle, emptyMessageTextStyle, trainingWrapperStyle, trainingDataWrapperStyle, trainingMenuWrapperStyle, trainingSectionWrapperStyle, trainingCoachSectionWrapperStyle, trainingSectionImageStyle, trainingCoachSectionImageStyle, trainingSectionPropertyTextStyle, trainingSectionValueTextStyle, trainingCapacitySectionWrapper, trainingButtonWrapperStyle, trainingButtonWrapperDisabledStyle, trainingButtonWrapperHiddenStyle, trainingButtonIconStyle, trainingDetailsModalWrapperStyle, trainingDetailsModalHeaderWrapperStyle, trainingDetailsModalTitleTextStyle, trainingDetailsModalExitButtonWrapperStyle, trainingDetailsModalExitButtonTextStyle, trainingDetailsModalDataRowWrapperStyle, trainingDetailsModalDataWrapperStyle, trainingDetailsModalDataPropertyTextStyle, trainingDetailsModalDataValueTextStyle }) {
    return (
        <>
            {
                trainings.length === 0 ?
                    <View
                        style={emptyMessageWrapperStyle}
                    >
                        <Text
                            style={emptyMessageTextStyle}
                        >
                            {emptyMessage}
                        </Text>
                    </View>
                    :
                    trainings.map((training, index) => {
                        return (
                            <Training
                                key={index}
                                id={training.id}
                                reserved={training.reserved}
                                date={moment(training.start).format('DD/MM')}
                                coachImage={training.coachImage}
                                coachFirstName={training.coachFirstName}
                                coachLastName={training.coachLastName}
                                start={moment(training.start).format('HH:mm')}
                                finish={moment(training.finish).format('HH:mm')}
                                numberOfReservations={training.numberOfReservations}
                                room={training.room}
                                capacity={training.capacity}
                                level={training.level}
                                title={training.title}
                                regime={training.regime}
                                exercises={training.exercises}
                                startDate={training.start}
                                reservationUpdated={reservationUpdated}
                                changeReservationUpdated={changeReservationUpdated}
                                changeLoading={changeLoading}
                                wrapperStyle={trainingWrapperStyle}
                                dataWrapperStyle={trainingDataWrapperStyle}
                                menuWrapperStyle={trainingMenuWrapperStyle}
                                sectionWrapperStyle={trainingSectionWrapperStyle}
                                coachSectionWrapperStyle={trainingCoachSectionWrapperStyle}
                                sectionImageStyle={trainingSectionImageStyle}
                                coachSectionImageStyle={trainingCoachSectionImageStyle}
                                sectionPropertyTextStyle={trainingSectionPropertyTextStyle}
                                sectionValueTextStyle={trainingSectionValueTextStyle}
                                capacitySectionWrapper={trainingCapacitySectionWrapper}
                                buttonWrapperStyle={trainingButtonWrapperStyle}
                                buttonWrapperDisabledStyle={trainingButtonWrapperDisabledStyle}
                                buttonWrapperHiddenStyle={trainingButtonWrapperHiddenStyle}
                                buttonIconStyle={trainingButtonIconStyle}
                                detailsModalWrapperStyle={trainingDetailsModalWrapperStyle}
                                detailsModalHeaderWrapperStyle={trainingDetailsModalHeaderWrapperStyle}
                                detailsModalTitleTextStyle={trainingDetailsModalTitleTextStyle}
                                detailsModalExitButtonWrapperStyle={trainingDetailsModalExitButtonWrapperStyle}
                                detailsModalExitButtonTextStyle={trainingDetailsModalExitButtonTextStyle}
                                detailsModalDataRowWrapperStyle={trainingDetailsModalDataRowWrapperStyle}
                                detailsModalDataWrapperStyle={trainingDetailsModalDataWrapperStyle}
                                detailsModalDataPropertyTextStyle={trainingDetailsModalDataPropertyTextStyle}
                                detailsModalDataValueTextStyle={trainingDetailsModalDataValueTextStyle}
                            />
                        )
                    })
            }
        </>
    )
}

export default TrainingsSection