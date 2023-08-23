import { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import Modal from 'react-native-modal'
import * as WebBrowser from 'expo-web-browser'

import Title from '../../../components/title'
import Button from '../../../components/button'
import AttachmentsSection from '../../../sections/attachments'
import ImagesSection from '../../../sections/images'
import VideosSection from '../../../sections/videos'

function BlogPostModal({ isOpen, close, title, categories, content, images, videos, attachments, wrapperStyle, headerWrapperStyle, titleTextStyle, exitButtonWrapperStyle, exitButtonTextStyle, sectionWrapper, subtitleTextStyle, contentTextStyle, assetButtonWrapperStyle,  assetButtonTextStyle, photoGalleryHeaderWrapperStyle, videoGalleryHeaderWrapperStyle, galleryExitButtonWrapperStyle, galleryExitButtonTextStyle }) {
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
            <ScrollView>
                <View
                    style={wrapperStyle}
                >
                    <View
                        style={headerWrapperStyle}
                    >
                        <Title
                            text={title}
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
                    <Text
                        style={subtitleTextStyle}
                    >
                        categories: {categories}
                    </Text>
                    <Text
                        style={contentTextStyle}
                    >
                        {content}
                    </Text>
                    {
                        attachments.length > 0 &&
                            <AttachmentsSection
                                attachments={attachments}
                                downloadAttachment={downloadAttachment}
                                wrapperStyle={sectionWrapper}
                                subtitleTextStyle={subtitleTextStyle}
                                assetButtonWrapperStyle={assetButtonWrapperStyle}
                                assetButtonTextStyle={assetButtonTextStyle}
                            />
                    }
                    {
                        images.length > 0 &&
                            <ImagesSection
                                images={images}
                                isPhotoGalleryOpen={photoGalleryOpen}
                                openPhotoGallery={openPhotoGallery}
                                closePhotoGallery={closePhotoGallery}
                                wrapperStyle={sectionWrapper}
                                subtitleTextStyle={subtitleTextStyle}
                                assetButtonWrapperStyle={assetButtonWrapperStyle}
                                assetButtonTextStyle={assetButtonTextStyle}
                                photoGalleryHeaderWrapperStyle={photoGalleryHeaderWrapperStyle}
                                photoGalleryHeaderButtonWrapperStyle={galleryExitButtonWrapperStyle}
                                photoGalleryHeaderButtonTextStyle={galleryExitButtonTextStyle}
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
                                wrapperStyle={sectionWrapper}
                                subtitleTextStyle={subtitleTextStyle}
                                assetButtonWrapperStyle={assetButtonWrapperStyle}
                                assetButtonTextStyle={assetButtonTextStyle}
                                videoGalleryHeaderWrapperStyle={videoGalleryHeaderWrapperStyle}
                                videoGalleryHeaderButtonWrapperStyle={galleryExitButtonWrapperStyle}
                                videoGalleryHeaderButtonTextStyle={galleryExitButtonTextStyle}
                            />
                    }      
                </View>
            </ScrollView>
        </Modal>
    )
}

export default BlogPostModal