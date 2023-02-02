import { View, TouchableOpacity, Text } from 'react-native'

function Button({ showMessage, messageText, work, buttonText, wrapperStyle, buttonWrapperStyle, buttonTextStyle, messageWrapperStyle, messageTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <TouchableOpacity
                style={buttonWrapperStyle}
                onPress={() => work()}
            >
                <Text
                    style={buttonTextStyle}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
            {
                showMessage &&
                    <View
                        style={messageWrapperStyle}
                    >
                        <Text
                            style={messageTextStyle}
                        >
                            {messageText}
                        </Text>
                    </View>
            }
        </View>
    )
}

export default Button