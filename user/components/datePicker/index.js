import { View, TouchableOpacity, Image, Text } from 'react-native'

import leftArrowIcon from '../../assets/icons/left.png'
import rightArrowIcon from '../../assets/icons/right.png'

function DatePicker({ dateShow, dateDay, changeDate, disabled, wrapperStyle, buttonWrapperStyle, buttonDisabledStyle, buttonIconStyle, textStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <TouchableOpacity
                style={[buttonWrapperStyle, disabled && buttonDisabledStyle]}
                onPress={disabled ? () => {} : () => changeDate(-1)}
                disabled={disabled}
            >
                <Image
                    style={buttonIconStyle}
                    source={leftArrowIcon}
                />
            </TouchableOpacity>
            <Text
                style={textStyle}
            >
                {dateShow} ({dateDay})
            </Text>
            <TouchableOpacity
                style={[buttonWrapperStyle, disabled && buttonDisabledStyle]}
                onPress={disabled ? () => {} : () => changeDate(1)}
                disabled={disabled}
            >
                <Image
                    style={buttonIconStyle}
                    source={rightArrowIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

export default DatePicker