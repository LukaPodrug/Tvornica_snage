import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'

import BlogPostModal from '../../pages/modals/blogPost'

import photoIcon from '../../assets/icons/camera.png'
import videoIcon from '../../assets/icons/video.png'
import attachmentIcon from '../../assets/icons/attachment.png'

function BlogPost({ title, categories, content, images, videos, attachments }) {
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
                style={styles.blogPostWrapper}
            >
                <Text
                    style={styles.titleText}
                >
                    {title}
                </Text>
                <Text
                    style={styles.categoriesText}
                >
                    categories: {categories}
                </Text>
                <View
                    style={styles.numbersWrapper}
                >
                    <View
                        style={styles.numberWrapper}
                    >
                        <Image
                            style={styles.icon}
                            source={photoIcon}
                        />
                        <Text
                            style={styles.numberText}
                        >
                            {images.length}
                        </Text>
                    </View>
                    <View
                        style={styles.numberWrapper}
                    >
                        <Image
                            style={styles.icon}
                            source={videoIcon}
                        />
                        <Text
                            style={styles.numberText}
                        >
                            {videos.length}
                        </Text>
                    </View>
                    <View
                        style={styles.numberWrapper}
                    >
                        <Image
                            style={styles.icon}
                            source={attachmentIcon}
                        />
                        <Text
                            style={styles.numberText}
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
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blogPostWrapper: {
        padding: 10,

        backgroundColor: '#e6e6e6',

        borderRadius: 10,
        
        marginBottom: 10
    },
    titleText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,

        marginBottom: 10
    },
    categoriesText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 14,
        textTransform: 'uppercase',

        marginBottom: 10
    },
    numbersWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    numberWrapper: {
        width: 55,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,

        marginRight: 5,

        backgroundColor: '#90ee90',

        borderRadius: 10
    },
    icon: {
        width: 20,
        height: 20,

        marginRight: 5
    },
    numberText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16,
    }
})

export default BlogPost