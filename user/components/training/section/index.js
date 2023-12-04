import { View, Image, Text } from 'react-native'

function TrainingSection({ showText, image, property, value, wrapperStyle, imageStyle, propertyTextStyle, valueTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Image
                style={imageStyle}
                source={(typeof(image) === 'string') ? {uri: image} : image}
            />
            {
                showText &&
                    <>
                        <Text
                            style={propertyTextStyle}
                        >
                            {property}
                        </Text>
                        <Text
                            style={valueTextStyle}
                        >
                            {value}
                        </Text>
                    </>
            }
        </View>
    )
}

export default TrainingSection