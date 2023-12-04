import { View, Text } from 'react-native'
import PieChart from 'react-native-pie-chart'

function TrainingCapacity({ numberOfReservations, capacity, wrapperStyle, propertyTextStyle, valueTextStyle }) {

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
            style={wrapperStyle}
        >
            <PieChart
                widthAndHeight={30}
                series={[capacityHelp[0].value, capacityHelp[1].value]}
                sliceColor={[capacityHelp[0].color, capacityHelp[1].color]}
                coverRadius={0.65}
                coverFill={null}
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