import { View, Text, TextInput } from 'react-native'

function InputText({ removeMessage, password, showLabel, label, text, changeText, placeholder, wrapperStyle, labelStyle, inputStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            {
                showLabel &&
                <Text
                    style={labelStyle}
                >
                    {label}
                </Text>
            }
            <TextInput
                style={inputStyle}
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