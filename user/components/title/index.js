import { Text } from 'react-native'

function Title({ text, style }) {
    return (
        <Text
            style={style}
        >
            {text}
        </Text>
    )
}

export default Title