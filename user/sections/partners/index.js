import { View, Text } from 'react-native'

import Partner from '../../components/partner'

function PartnersSection({ partners, emptyMessage, emptyMessageWrapperStyle, emptyMessageTextStyle, partnerWrapperStyle, partnerTextStyle }) {
    return (
        <>
            {
                partners.length === 0 ?
                    <View
                        style={emptyMessageWrapperStyle}
                    >
                        <Text
                            style={emptyMessageTextStyle}
                        >
                            {emptyMessage}
                        </Text>
                    </View>
                    :
                    partners.map((partner, index) => {
                        return (
                            <Partner
                                key={index}
                                name={partner.name}
                                link={partner.link}
                                wrapperStyle={partnerWrapperStyle}
                                textStyle={partnerTextStyle}
                            />
                        )
                    })
            }
        </>
    )
}

export default PartnersSection