import { useRef } from 'react'
import { View, Text, TextInput } from 'react-native'

function InputText({ date, removeMessage, password, showLabel, label, text, changeText, placeholder, wrapperStyle, labelTextStyle, inputTextStyle }) {
    const textInputRef = useRef(null)

    function updateText(newText) {
        if(date) {
            if(newText.length < 11) {
                changeText(newText)
                if((newText.length === 2 || newText.length === 5) && text.length < newText.length) {
                    textInputRef.current.value = newText + '/'
                    changeText(textInputRef.current.value)
                }
            }
        }
        else {
            changeText(newText)
        }
      }
    
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
                ref={textInputRef}
                style={inputTextStyle}
                value={text}
                onChangeText={newText => updateText(newText)}
                onPressIn={() => removeMessage()}
                secureTextEntry={password}
                placeholder={placeholder}
            />
        </View>
    )
}

export default InputText