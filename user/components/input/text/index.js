import { View, Text, TextInput } from 'react-native'

function InputText({ password, showLabel, label, text, changeText, wrapperStyle, labelStyle, inputStyle }) {
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
                secureTextEntry={password}
            />
        </View>
    )
}

export default InputText