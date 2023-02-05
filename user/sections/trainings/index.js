import { StyleSheet, View, Text } from 'react-native'
import moment from 'moment'

import Training from '../../components/training'

function TrainingsSection({ trainings, emptyMessage }) {
    return (
        <>
            {
                trainings.length === 0 ?
                    <View
                        style={styles.emptyWrapper}
                    >
                        <Text
                            style={styles.emptyText}
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
                                date={moment(training.start).format('DD/MM')}
                                coachImage={training.coachImage}
                                coachLastName={training.coachLastName}
                                start={moment(training.start).format('HH:mm')}
                                finish={moment(training.finish).format('HH:mm')}
                                numberOfReservations={training.numberOfReservations}
                                capacity={training.capacity}
                                level={training.level}
                                title={training.title}
                                regime={training.regime}
                                exercises={training.exercises}
                            />
                        )
                    })
            }
        </>
    )
}

const styles = StyleSheet.create({
    emptyWrapper: {
        width: '100%',

        borderRadius: 10,

        backgroundColor: '#e6e6e6',

        padding: 10
    },
    emptyText: {
        fontFamily: 'Ubuntu_700Bold',
        textTransform: 'uppercase',
        fontSize: 14
    }
})

export default TrainingsSection