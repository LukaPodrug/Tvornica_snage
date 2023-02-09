import { View, Text } from 'react-native'

import Button from '../../components/button'

function AttachmentsSection({ attachments, downloadAttachment, wrapperStyle, subtitleTextStyle, assetButtonWrapperStyle, assetButtonTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Text
                style={subtitleTextStyle}
            >
                download attachments:
            </Text>
            {
                attachments.map((attachment, index) => {
                    return (
                        <Button
                            key={index}
                            loading={false}
                            showMessage={false}
                            messageText={null}
                            work={() => downloadAttachment(attachment.url)}
                            buttonText={attachment.title}
                            wrapperStyle={null}
                            buttonWrapperStyle={assetButtonWrapperStyle}
                            buttonTextStyle={assetButtonTextStyle}
                            messageWrapperStyle={null}
                            messageTextStyle={null}
                        />
                    )
                })
            }
        </View>
    )
}

export default AttachmentsSection