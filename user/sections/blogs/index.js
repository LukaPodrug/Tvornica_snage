import { StyleSheet, View, Text } from 'react-native'

import BlogPost from '../../components/blogPost'
import Button from '../../components/button'

function BlogsSection({ blogPosts, totalBlogPosts, loadMore }) {
    return (
        <>
            {
                blogPosts.length === 0 ?
                    <View
                        style={styles.emptyWrapper}
                    >
                        <Text
                            style={styles.emptyText}
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
    emptyWrapper: {
        padding: 10,

        backgroundColor: '#e6e6e6',
        
        borderRadius: 10
    },
    emptyText: {
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
    }
})

export default BlogsSection