import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native'

function Button({ loading, showMessage, messageText, work, buttonText, wrapperStyle, buttonWrapperStyle, buttonTextStyle, messageWrapperStyle, messageTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <TouchableOpacity
                style={buttonWrapperStyle}
                onPress={() => work()}
            >
                {
                    loading ? 
                        <ActivityIndicator
                            size='small'
                            color='#000000'
                        />
                        :
                        <Text
                            style={buttonTextStyle}
                        >
                            {buttonText}
                        </Text>
                }
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