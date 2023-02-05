import { StyleSheet, View } from 'react-native'

import TrainingSection from './section'
import TrainingCapacity from './capacity'
import TrainingButton from './button'

import calendarIcon from '../../assets/icons/calendar.png'
import startIcon from '../../assets/icons/start.png'
import finishIcon from '../../assets/icons/finish.png'
import moreIcon from '../../assets/icons/more.png'
import addReservationIcon from '../../assets/icons/registration.png'
import removeReservationIcon from '../../assets/icons/remove.png'

function Training({ id, date, coachImage, coachLastName, start, finish, numberOfReservations, capacity, level, title, regime, exercises }) {
    return (
        <View
            style={styles.wrapper}
        >
            <View
                style={styles.dataWrapper}
            >
                <TrainingSection
                    image={calendarIcon}
                    property='date'
                    value={date}
                    wrapperStyle={styles.sectionWrapper}
                    imageStyle={styles.sectionImage}
                    propertyTextStyle={styles.propertyText}
                    valueTextStyle={styles.valueText}
                />
                <TrainingSection
                    image={coachImage}
                    property='coach'
                    value={coachLastName}
                    wrapperStyle={[styles.sectionWrapper, styles.coachWrapper]}
                    imageStyle={[styles.sectionImage, styles.coachImage]}
                    propertyTextStyle={styles.propertyText}
                    valueTextStyle={styles.valueText}
                />
                <TrainingSection
                    image={startIcon}
                    property='start'
                    value={start}
                    wrapperStyle={styles.sectionWrapper}
                    imageStyle={styles.sectionImage}
                    propertyTextStyle={styles.propertyText}
                    valueTextStyle={styles.valueText}
                />
                <TrainingSection
                    image={finishIcon}
                    property='finish'
                    value={finish}
                    wrapperStyle={styles.sectionWrapper}
                    imageStyle={styles.sectionImage}
                    propertyTextStyle={styles.propertyText}
                    valueTextStyle={styles.valueText}
                />
                <TrainingCapacity
                    numberOfReservations={numberOfReservations}
                    capacity={capacity}
                    propertyTextStyle={styles.propertyText}
                    valueTextStyle={styles.valueText}
                />
            </View>
            <View
                style={styles.menuWrapper}
            >
                <TrainingButton
                    work={() => {}}
                    image={moreIcon}
                    disabled={false}
                    wrapperStyle={styles.button}
                    imageStyle={styles.buttonImage}
                />
                <TrainingButton
                    work={() => {}}
                    image={addReservationIcon}
                    disabled={false}
                    wrapperStyle={styles.button}
                    imageStyle={styles.buttonImage}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',

        width: '100%',

        backgroundColor: '#e6e6e6',

        marginBottom: 10,

        borderRadius: 10,

        padding: 5
    },

    dataWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        flexGrow: 1,

        marginRight: 5
    },
    sectionWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    coachWrapper: {
        width: 75
    },
    sectionImage: {
        width: 30,
        height: 30
    },
    coachImage: {
        borderRadius: 15
    },
    propertyText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 12,
        textTransform: 'uppercase'
    },
    valueText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 14,
        textTransform: 'uppercase'
    },

    menuWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 5
    },
    button: {
        width: 30,
        height: 30,

        borderRadius: 15,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 5,
        marginRight: 5,

        backgroundColor: 'red'
    },
    buttonImage: {
        width: 20,
        height: 20
    }
})

export default Training