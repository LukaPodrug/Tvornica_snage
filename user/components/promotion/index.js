import { View, Text } from 'react-native'

function Promotion({ partnerName, code,  wrapperStyle, textStyle }) {

    return (
        <View
            style={wrapperStyle}
        >
            <Text
                style={textStyle}
            >
                {partnerName}
            </Text>
            <Text
                style={textStyle}
            >
                {code}
            </Text>
        </View>
    )
}

export default Promotion