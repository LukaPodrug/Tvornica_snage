import { TouchableOpacity, Text, Linking } from 'react-native'

function Partner({ name, link, wrapperStyle, textStyle }) {
    function openPartnerWebsite() {
        Linking.openURL(link)
    }

    return (
        <TouchableOpacity
            style={wrapperStyle}
            onPress={() => openPartnerWebsite()}
        >
            <Text
                style={textStyle}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default Partner