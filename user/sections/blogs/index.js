import { StyleSheet, View, Text } from 'react-native'

import BlogPost from '../../components/blogPost'
import Button from '../../components/button'

function BlogsSection({ blogPosts, totalBlogPosts, loadMore }) {
    return (
        <>
            {
                blogPosts.length === 0 ?
                    <View
                        style={styles.emptyMessageWrapper}
                    >
                        <Text
                            style={styles.emptyMessageText}
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
                                        wrapperStyle={styles.blogPostWrapper}
                                        titleTextStyle={styles.blogPostTitleTextStyle}
                                        categoriesTextStyle={styles.blogPostCategoriesTextStyle}
                                        attachmentsWrapperStyle={styles.blogPostAttachmentsWrapper}
                                        attachmentWrapperStyle={styles.blogPostAttachmentWrapper}
                                        attachmentIconStyle={styles.blogPostAttachmentIconStyle}
                                        attachmentTextStyle={styles.blogPostAttachmentTextStyle}
                                        modalWrapperStyle={styles.blogPostModalWrapper}
                                        modalHeaderWrapperStyle={styles.blogPostModalHeaderWrapper}
                                        modalTitleTextStyle={styles.blogPostModalTitleText}
                                        modalExitButtonWrapperStyle={styles.blogPostModalExitButtonWrapper}
                                        modalExitButtonTextStyle={styles.blogPostModalExitButtonText}
                                        modalSectionWrapper={styles.blogPostModalSectionWrapper}
                                        modalSubtitleTextStyle={styles.blogPostModalSubtitleText}
                                        modalContentTextStyle={styles.blogPostModalContentText}
                                        modalAssetButtonWrapperStyle={styles.blogPostModalAssetButtonWrapper}
                                        modalAssetButtonTextStyle={styles.blogPostModalAssetButtonText}
                                        modalPhotoGalleryHeaderWrapperStyle={styles.blogPostModalPhotoGalleryHeader}
                                        modalVideoGalleryHeaderWrapperStyle={styles.blogPostModalVideoGalleryHeader}
                                        modalGalleryExitButtonWrapperStyle={styles.blogPostModalGalleryExitButtonWrapper}
                                        modalGalleryExitButtonTextStyle={styles.blogPostModalGalleryExitButtonText}
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

const styles = StyleSheet.create({
    emptyMessageWrapper: {
        padding: 10,

        backgroundColor: '#e6e6e6',
        
        borderRadius: 10
    },
    emptyMessageText: {
        fontFamily: 'Ubuntu_700Bold',
        textTransform: 'uppercase',
        fontSize: 15,
    },

    buttonWrapper: {
        padding: 10,
        
        borderRadius: 10,
    
        backgroundColor: '#90ee90',
    
        marginTop: 5,
        marginBottom: 5
    },
    buttonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000000'
    },

    blogPostWrapper: {
        padding: 10,

        backgroundColor: '#ffffff',

        borderRadius: 10,
        
        marginBottom: 10
    },
    blogPostTitleTextStyle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,

        marginBottom: 10
    },
    blogPostCategoriesTextStyle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 14,
        textTransform: 'uppercase',

        marginBottom: 10
    },
    blogPostAttachmentsWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    blogPostAttachmentWrapper: {
        width: 55,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,

        marginRight: 5,

        backgroundColor: '#e04f5f',

        borderRadius: 10
    },
    blogPostAttachmentIconStyle: {
        width: 20,
        height: 20,

        marginRight: 5
    },
    blogPostAttachmentTextStyle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
    },

    blogPostModalWrapper: {
        backgroundColor: '#ffffff',

        flex: 0,

        padding: 10,

        borderRadius: 10
    },
    blogPostModalHeaderWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 5
    },
    blogPostModalTitleText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },
    blogPostModalExitButtonWrapper: {
        padding: 10,

        borderRadius: 10,

        backgroundColor: '#e04f5f',
    },
    blogPostModalExitButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000000'
    },
    blogPostModalSubtitleText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    blogPostModalContentText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,

        marginTop: 10
    },
    blogPostModalSectionWrapper: {
        marginTop: 10
    },
    blogPostModalAssetButtonWrapper: {
        padding: 10,
    
        borderRadius: 10,

        backgroundColor: '#e04f5f',

        marginTop: 5,
        marginBottom: 5
    },
    blogPostModalAssetButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000000'
    },
    blogPostModalPhotoGalleryHeader: {
        marginTop: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    blogPostModalVideoGalleryHeader: {
        marginTop: 20,
        marginRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

        width: '100%'
    },
    blogPostModalGalleryExitButtonWrapper: {
        padding: 10,

        borderRadius: 10,

        backgroundColor: '#e04f5f',
    },
    blogPostModalGalleryExitButtonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#000000'
    }
})

export default BlogsSection