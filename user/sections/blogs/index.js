import { View, Text } from 'react-native'

import BlogPost from '../../components/blogPost'
import Button from '../../components/button'

function BlogsSection({ blogPosts, totalBlogPosts, loadMore, blogsSectionEmptyMessageWrapperStyle, blogsSectionEmptyMessageTextStyle, blogPostWrapperStyle, blogPostTitleTextStyle, blogPostCategoriesTextStyle, blogPostAttachmentsWrapperStyle, blogPostAttachmentWrapperStyle, blogPostAttachmentIconStyle, blogPostAttachmentTextStyle, blogPostModalWrapperStyle, blogPostModalHeaderWrapperStyle, blogPostModalTitleTextStyle, blogPostModalExitButtonWrapperStyle, blogPostModalExitButtonTextStyle, blogPostModalSectionWrapperStyle, blogPostModalSubtitleTextStyle, blogPostModalContentTextStyle, blogPostModalAssetButtonWrapperStyle,  blogPostModalAssetButtonTextStyle, blogPostModalPhotoGalleryHeaderWrapperStyle, blogPostModalVideoGalleryHeaderWrapperStyle, blogPostModalGalleryExitButtonWrapperStyle, blogPostModalGalleryExitButtonTextStyle }) {
    return (
        <>
            {
                blogPosts.length === 0 ?
                    <View
                        style={blogsSectionEmptyMessageWrapperStyle}
                    >
                        <Text
                            style={blogsSectionEmptyMessageTextStyle}
                        >
                            No news available
                        </Text>
                    </View>
                    :
                    <>
                        {
                            blogPosts.map((blogPost, index) => {
                                return (
                                    <BlogPost
                                        key={index}
                                        title={blogPost.title}
                                        categories={blogPost.categories}
                                        content={blogPost.content}
                                        images={blogPost.images.items}
                                        videos={blogPost.videos.items}
                                        attachments={blogPost.attachments.items}
                                        wrapperStyle={blogPostWrapperStyle}
                                        titleTextStyle={blogPostTitleTextStyle}
                                        categoriesTextStyle={blogPostCategoriesTextStyle}
                                        attachmentsWrapperStyle={blogPostAttachmentsWrapperStyle}
                                        attachmentWrapperStyle={blogPostAttachmentWrapperStyle}
                                        attachmentIconStyle={blogPostAttachmentIconStyle}
                                        attachmentTextStyle={blogPostAttachmentTextStyle}
                                        modalWrapperStyle={blogPostModalWrapperStyle}
                                        modalHeaderWrapperStyle={blogPostModalHeaderWrapperStyle}
                                        modalTitleTextStyle={blogPostModalTitleTextStyle}
                                        modalExitButtonWrapperStyle={blogPostModalExitButtonWrapperStyle}
                                        modalExitButtonTextStyle={blogPostModalExitButtonTextStyle}
                                        modalSectionWrapper={blogPostModalSectionWrapperStyle}
                                        modalSubtitleTextStyle={blogPostModalSubtitleTextStyle}
                                        modalContentTextStyle={blogPostModalContentTextStyle}
                                        modalAssetButtonWrapperStyle={blogPostModalAssetButtonWrapperStyle}
                                        modalAssetButtonTextStyle={blogPostModalAssetButtonTextStyle}
                                        modalPhotoGalleryHeaderWrapperStyle={blogPostModalPhotoGalleryHeaderWrapperStyle}
                                        modalVideoGalleryHeaderWrapperStyle={blogPostModalVideoGalleryHeaderWrapperStyle}
                                        modalGalleryExitButtonWrapperStyle={blogPostModalGalleryExitButtonWrapperStyle}
                                        modalGalleryExitButtonTextStyle={blogPostModalGalleryExitButtonTextStyle}
                                    />
                                )
                            })
                        }
                        {
                            blogPosts.length !== totalBlogPosts &&
                                <Button
                                    loading={false}
                                    showMessage={false}
                                    messageText={null}
                                    work={loadMore}
                                    buttonText='load more'
                                    wrapperStyle={null}
                                    buttonWrapperStyle={styles.buttonWrapper}
                                    buttonTextStyle={styles.buttonText}
                                    messageWrapperStyle={null}
                                    messageTextStyle={null}
                                />
                        }
                    </>
            }
        </>
    )
}

export default BlogsSection