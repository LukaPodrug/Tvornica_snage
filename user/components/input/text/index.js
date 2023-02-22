import { View, Text, TextInput } from 'react-native'

function InputText({ removeMessage, password, showLabel, label, text, changeText, placeholder, wrapperStyle, labelTextStyle, inputTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            {
                showLabel &&
                <Text
                    style={labelTextStyle}
                >
                    {label}
                </Text>
            }
            <TextInput
                style={inputTextStyle}
                value={text}
                onChangeText={changeText}
                onPressIn={() => removeMessage()}
                secureTextEntry={password}
                placeholder={placeholder}
            />
        </View>
    )
}

export default InputText