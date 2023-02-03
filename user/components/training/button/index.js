import { TouchableOpacity, Image } from 'react-native'

function TrainingButton({ work, image, disabled, wrapperStyle, imageStyle }) {
    return (
        <TouchableOpacity
            style={wrapperStyle}
            onPress={disabled ? () => {} : () => work()}
        >
            <Image
                style={imageStyle}
                source={image}
            />
        </TouchableOpacity>
    )
}

export default TrainingButton