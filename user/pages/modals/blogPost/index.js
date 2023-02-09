import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Modal from 'react-native-modal'
import * as WebBrowser from 'expo-web-browser'

import Title from '../../../components/title'
import Button from '../../../components/button'
import AttachmentsSection from '../../../sections/attachments'
import ImagesSection from '../../../sections/images'
import VideosSection from '../../../sections/videos'

function BlogPostModal({ isOpen, close, title, categories, content, images, videos, attachments }) {
    const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false)
    const [videoOpen, setVideoOpen] = useState(false)
    const [videoURL, setVideoURL] = useState('')

    function openPhotoGallery() {
        setPhotoGalleryOpen(true)
    }

    function closePhotoGallery() {
        setPhotoGalleryOpen(false)
    }

    function openVideo(url) {
        setVideoURL(url)
        setVideoOpen(true)
    }

    function closeVideo() {
        setVideoOpen(false)
        setVideoURL('')
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
                        <AttachmentsSection
                            attachments={attachments}
                            downloadAttachment={downloadAttachment}
                            wrapperStyle={styles.attachmentSectionWrapper}
                            subtitleTextStyle={styles.subtitleText}
                            assetButtonWrapperStyle={styles.assetButtonWrapper}
                            assetButtonTextStyle={styles.assetButtonText}
                        />
                }
                {
                    images.length > 0 &&
                        <ImagesSection
                            images={images}
                            isPhotoGalleryOpen={photoGalleryOpen}
                            openPhotoGallery={openPhotoGallery}
                            closePhotoGallery={closePhotoGallery}
                            wrapperStyle={styles.imagesSectionWrapper}
                            subtitleTextStyle={styles.subtitleText}
                            assetButtonWrapperStyle={styles.assetButtonWrapper}
                            assetButtonTextStyle={styles.assetButtonText}
                            photoGalleryHeaderWrapperStyle={styles.photoGalleryHeader}
                            photoGalleryHeaderButtonWrapperStyle={styles.buttonWrapper}
                            photoGalleryHeaderButtonTextStyle={styles.buttonText}
                        />
                }       
                {
                    videos.length > 0 &&
                        <VideosSection
                            videos={videos}
                            openVideo={openVideo}
                            closeVideo={closeVideo}
                            isVideoOpen={videoOpen}
                            videoURL={videoURL}
                            wrapperStyle={styles.videosSectionWrapper}
                            subtitleTextStyle={styles.subtitleText}
                            assetButtonWrapperStyle={styles.assetButtonWrapper}
                            assetButtonTextStyle={styles.assetButtonText}
                            videoGalleryHeaderWrapperStyle={styles.videoGalleryHeader}
                            videoGalleryHeaderButtonWrapperStyle={styles.buttonWrapper}
                            videoGalleryHeaderButtonTextStyle={styles.buttonText}
                        />
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
        textTransform: 'uppercase'
    },

    contentText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,

        marginTop: 10
    },

    attachmentSectionWrapper: {
        marginTop: 10
    },

    imagesSectionWrapper: {
        marginTop: 10
    },

    videosSectionWrapper: {
        marginTop: 10
    },

    assetButtonWrapper: {
        padding: 10,
    
        borderRadius: 10,

        backgroundColor: '#90ee90',

        marginTop: 5,
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
    },

    videoGalleryHeader: {
        marginTop: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

        width: '100%'
    }
})

export default BlogPostModal