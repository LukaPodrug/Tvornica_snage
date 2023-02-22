import { Text } from 'react-native'

function Title({ text, textStyle }) {
    return (
        <Text
            style={textStyle}
        >
            {text}
        </Text>
    )
}

export default Title