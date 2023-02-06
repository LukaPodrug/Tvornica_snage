import { TouchableOpacity, Image } from 'react-native'

function TrainingButton({ work, image, disabled, wrapperStyle, imageStyle }) {
    return (
        <TouchableOpacity
            style={[wrapperStyle, disabled && {backgroundColor: '#807d7d'}]}
            onPress={disabled ? () => {} : () => work()}
            disabled={disabled}
        >
            <Image
                style={imageStyle}
                source={image}
            />
        </TouchableOpacity>
    )
}

export default TrainingButton