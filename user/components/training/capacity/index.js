import { View, Text } from 'react-native'
import { DonutChart } from 'react-native-circular-chart'

function TrainingCapacity({ numberOfReservations, capacity, wrapperStyle, propertyTextStyle, valueTextStyle }) {

    const capacityHelp = [
        {
            name: 'number of reservations',
            value: numberOfReservations === 0 ? 0.000001 : numberOfReservations,
            color: '#e04f5f'
        },
        {
            name: 'free space',
            value: capacity - numberOfReservations === 0 ? 0.000001 : capacity - numberOfReservations,
            color: '#90ee90'
        }
    ]

    return (
        <View
            style={wrapperStyle}
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

export default TrainingCapacity