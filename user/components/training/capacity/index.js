import { StyleSheet, View, Text } from 'react-native'
import { DonutChart } from 'react-native-circular-chart'

function TrainingCapacity({ numberOfReservations, capacity, propertyTextStyle, valueTextStyle }) {
    const capacityHelp = [
        {
            name: 'number of reservations',
            value: numberOfReservations,
            color: '#e04f5f'
        },
        {
            name: 'free space',
            value: capacity - numberOfReservations,
            color: '#90ee90'
        }
    ]

    return (
        <View
            style={styles.wrapper}
        >
            <DonutChart
                data={capacityHelp}
                strokeWidth={4}
                radius={12}
                type='round'
                startAngle={0}
                endAngle={360}
                animationType='fade'
                containerWidth={30}
                containerHeight={30}
                labelTitleStyle={{display: 'none'}}
                labelValueStyle={{display: 'none'}}
            />
            <Text
                style={propertyTextStyle}
            >
                free
            </Text>
            <Text
                style={valueTextStyle}
            >{capacity - numberOfReservations}/{capacity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center'
    }
})

export default TrainingCapacity