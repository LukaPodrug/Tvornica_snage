import { View } from 'react-native'

import Button from '../../button'

function GalleryHeader({ work, wrapperStyle, buttonWrapperStyle, buttonTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Button
                loading={false}
                showMessage={false}
                messageText={null}
                work={work}
                buttonText='close'
                wrapperStyle={null}
                buttonWrapperStyle={buttonWrapperStyle}
                buttonTextStyle={buttonTextStyle}
                messageWrapperStyle={null}
                messageTextStyle={null}
            />
        </View>
    )
}

export default GalleryHeader