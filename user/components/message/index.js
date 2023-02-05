import { View, Text } from 'react-native'

function Message({ text, wrapperStyle, textStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Text
                style={textStyle}
            >
                {text}
            </Text>
        </View>
    )
}

export default Message