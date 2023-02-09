import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { ImageGallery } from '@georstat/react-native-image-gallery'
import * as WebBrowser from 'expo-web-browser'

import Title from '../../../components/title'
import Button from '../../../components/button'
import GalleryHeader from '../../../components/gallery/header'

function BlogPostModal({ isOpen, close, title, categories, content, images, videos, attachments }) {
    const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false)

    function openPhotoGallery() {
        setPhotoGalleryOpen(true)
    }

    function closePhotoGallery() {
        setPhotoGalleryOpen(false)
    }

    async function downloadAttachment(url) {
        try {
            WebBrowser.openBrowserAsync(url)
        }
        catch(error) {
            return
        }
    }

    return (
        <Modal
            isVisible={isOpen}
            backdropOpacity={1}
        >
            <View
                style={styles.wrapper}
            >
                <View
                    style={styles.header}
                >
                    <Title
                        text={title}
                        style={styles.titleText}
                    />
                    <Button
                        loading={false}
                        showMessage={false}
                        messageText={null}
                        work={close}
                        buttonText='close'
                        wrapperStyle={null}
                        buttonWrapperStyle={styles.buttonWrapper}
                        buttonTextStyle={styles.buttonText}
                        messageWrapperStyle={null}
                        messageTextStyle={null}
                    />
                </View>
                <Text
                    style={styles.subtitleText}
                >
                    categories: {categories}
                </Text>
                <Text
                    style={styles.contentText}
                >
                    {content}
                </Text>
                {
                    attachments.length > 0 &&
                        <>
                            <Text
                                style={styles.subtitleText}
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
                                            buttonWrapperStyle={styles.assetButtonWrapper}
                                            buttonTextStyle={styles.assetButtonText}
                                            messageWrapperStyle={null}
                                            messageTextStyle={null}
                                        />
                                    )
                                })
                            }
                        </>
                }
                {
                    images.length > 0 &&
                        <>
                            <Text
                                style={styles.subtitleText}
                            >
                                photo gallery:
                            </Text>
                            <Button
                                loading={false}
                                showMessage={false}
                                messageText={null}
                                work={openPhotoGallery}
                                buttonText='photo gallery'
                                wrapperStyle={null}
                                buttonWrapperStyle={styles.assetButtonWrapper}
                                buttonTextStyle={styles.assetButtonText}
                                messageWrapperStyle={null}
                                messageTextStyle={null}
                            />
                            <ImageGallery
                                isOpen={photoGalleryOpen}
                                close={closePhotoGallery}
                                images={images}
                                thumbColor='#e04f5f'
                                disableSwipe={true}
                                renderHeaderComponent={() => <GalleryHeader work={closePhotoGallery}  wrapperStyle={styles.photoGalleryHeader} buttonWrapperStyle={styles.buttonWrapper} buttonTextStyle={styles.buttonText}/>}
                            />
                        </>
                }       
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff',

        flex: 0,

        padding: 10,

        borderRadius: 10
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 5
    },
    titleText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },
    buttonWrapper: {
        padding: 10,

        borderRadius: 10,

        backgroundColor: '#e04f5f',
    },
    buttonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff'
    },

    subtitleText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 15,
        textTransform: 'uppercase',

        marginBottom: 10
    },

    contentText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,

        marginBottom: 10
    },

    assetButtonWrapper: {
        padding: 10,
    
        borderRadius: 10,

        backgroundColor: '#90ee90',

        marginBottom: 5
    },
    assetButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000000'
    },

    photoGalleryHeader: {
        marginTop: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export default BlogPostModal