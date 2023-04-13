import { View } from 'react-native'
import Modal from 'react-native-modal'

import Title from '../../../components/title'
import Button from '../../../components/button'

function ProfileDeleteModal({ isOpen, close, remove, deleting, wrapperStyle, headerWrapperStyle, titleTextStyle, exitButtonWrapperStyle, exitButtonTextStyle, deleteButtonMessageWrapperStyle, deleteButtonWrapperStyle, deleteButtonTextStyle, }) {    
    return (
        <Modal
            isVisible={isOpen}
            backdropOpacity={1}
        >
            <View
                style={wrapperStyle}
            >
                <View
                    style={headerWrapperStyle}
                >
                    <Title
                        text='delete account'
                        textStyle={titleTextStyle}
                    />
                    <Button
                        loading={false}
                        showMessage={false}
                        messageText={null}
                        work={close}
                        buttonText='close'
                        wrapperStyle={null}
                        buttonWrapperStyle={exitButtonWrapperStyle}
                        buttonTextStyle={exitButtonTextStyle}
                        messageWrapperStyle={null}
                        messageTextStyle={null}
                    />
                </View>
                <Button
                    loading={deleting}
                    showMessage={false}
                    messageText={null}
                    work={remove}
                    buttonText='delete account'
                    wrapperStyle={deleteButtonMessageWrapperStyle}
                    buttonWrapperStyle={deleteButtonWrapperStyle}
                    buttonTextStyle={deleteButtonTextStyle}
                    messageWrapperStyle={null}
                    messageTextStyle={null}
                />
            </View>
        </Modal>
    )
}

export default ProfileDeleteModal