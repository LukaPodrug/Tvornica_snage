import { useState } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'

import BlogPostModal from '../../pages/modals/blogPost'

import photoIcon from '../../assets/icons/camera.png'
import videoIcon from '../../assets/icons/video.png'
import attachmentIcon from '../../assets/icons/attachment.png'

function BlogPost({ title, categories, content, images, videos, attachments, wrapperStyle, titleTextStyle, categoriesTextStyle, attachmentsWrapperStyle, attachmentWrapperStyle, attachmentIconStyle, attachmentTextStyle, modalWrapperStyle, modalHeaderWrapperStyle, modalTitleTextStyle, modalExitButtonWrapperStyle, modalExitButtonTextStyle, modalSectionWrapper, modalSubtitleTextStyle, modalContentTextStyle, modalAssetButtonWrapperStyle,  modalAssetButtonTextStyle, modalPhotoGalleryHeaderWrapperStyle, modalVideoGalleryHeaderWrapperStyle, modalGalleryExitButtonWrapperStyle, modalGalleryExitButtonTextStyle }) {
    const [blogPostModalOpen, setBlogPostModalOpen] = useState(false)

    function openBlogPostModal() {
        setBlogPostModalOpen(true)
    }

    function closeBlogPostModal() {
        setBlogPostModalOpen(false)
    }

    return (
        <TouchableOpacity
            onPress={() => openBlogPostModal()}
        >
            <View
                style={wrapperStyle}
            >
                <Text
                    style={titleTextStyle}
                >
                    {title}
                </Text>
                <Text
                    style={categoriesTextStyle}
                >
                    categories: {categories}
                </Text>
                <View
                    style={attachmentsWrapperStyle}
                >
                    <View
                        style={attachmentWrapperStyle}
                    >
                        <Image
                            style={attachmentIconStyle}
                            source={photoIcon}
                        />
                        <Text
                            style={attachmentTextStyle}
                        >
                            {images.length}
                        </Text>
                    </View>
                    <View
                        style={attachmentWrapperStyle}
                    >
                        <Image
                            style={attachmentIconStyle}
                            source={videoIcon}
                        />
                        <Text
                            style={attachmentTextStyle}
                        >
                            {videos.length}
                        </Text>
                    </View>
                    <View
                        style={attachmentWrapperStyle}
                    >
                        <Image
                            style={attachmentIconStyle}
                            source={attachmentIcon}
                        />
                        <Text
                            style={attachmentTextStyle}
                        >
                            {attachments.length}
                        </Text>
                    </View>
                </View>
            </View>
            <BlogPostModal
                isOpen={blogPostModalOpen}
                close={closeBlogPostModal}
                title={title}
                categories={categories}
                content={content}
                images={images}
                videos={videos}
                attachments={attachments}
                wrapperStyle={modalWrapperStyle}
                headerWrapperStyle={modalHeaderWrapperStyle}
                titleTextStyle={modalTitleTextStyle}
                exitButtonWrapperStyle={modalExitButtonWrapperStyle}
                exitButtonTextStyle={modalExitButtonTextStyle}
                sectionWrapper={modalSectionWrapper}
                subtitleTextStyle={modalSubtitleTextStyle}
                contentTextStyle={modalContentTextStyle}
                assetButtonWrapperStyle={modalAssetButtonWrapperStyle}
                assetButtonTextStyle={modalAssetButtonTextStyle}
                photoGalleryHeaderWrapperStyle={modalPhotoGalleryHeaderWrapperStyle}
                videoGalleryHeaderWrapperStyle={modalVideoGalleryHeaderWrapperStyle}
                galleryExitButtonWrapperStyle={modalGalleryExitButtonWrapperStyle}
                galleryExitButtonTextStyle={modalGalleryExitButtonTextStyle}
            />
        </TouchableOpacity>
    )
}

export default BlogPost