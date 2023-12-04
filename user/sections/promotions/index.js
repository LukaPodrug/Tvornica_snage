import { View, Text } from 'react-native'

import Promotion from '../../components/promotion'

function PromotionsSection({ promotions, emptyMessage, emptyMessageWrapperStyle, emptyMessageTextStyle, promotionWrapperStyle, promotionTextStyle }) {
    return (
        <>
            {
                promotions.length === 0 ?
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
                    promotions.map((promotion, index) => {
                        return (
                            <Promotion
                                key={index}
                                partnerName={promotion.partnerName}
                                code={promotion.code}
                                wrapperStyle={promotionWrapperStyle}
                                textStyle={promotionTextStyle}
                            />
                        )
                    })
            }
        </>
    )
}

export default PromotionsSection