import { View, Text } from 'react-native'

function Info({ property, value, labelTextStyle, valueTextStyle }) {
    return (
        <View>
            <Text
                style={labelTextStyle}
            >
                {property}
            </Text>
            <Text
                style={valueTextStyle}
            >
                {value}
            </Text>
        </View>
    )
}

export default Info