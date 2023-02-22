import { TouchableOpacity, Image } from 'react-native'

function TrainingButton({ work, image, disabled, wrapperStyle, wrapperDisabledStyle, iconStyle }) {
    return (
        <TouchableOpacity
            style={[wrapperStyle, disabled && wrapperDisabledStyle]}
            onPress={disabled ? () => {} : () => work()}
            disabled={disabled}
        >
            <Image
                style={iconStyle}
                source={image}
            />
        </TouchableOpacity>
    )
}

export default TrainingButton