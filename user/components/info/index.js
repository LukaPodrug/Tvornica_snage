import { View, Text } from 'react-native'

function Info({ property, value, propertyTextStyle, valueTextStyle }) {
    return (
        <View>
            <Text
                style={propertyTextStyle}
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