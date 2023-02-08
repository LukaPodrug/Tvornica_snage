import { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useQuery } from '@apollo/client'

import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import BlogPost from '../../components/blogPost'
import { blogPostsQuery } from '../../API/graphQL/blogs'

function NewsPage() {
  const { data, loading } = useQuery(blogPostsQuery)

  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    if(!loading) {
      setBlogPosts(data.blogPostCollection.items)
    }
  }, []) 

  return (
    <View
      style={styles.newsPageWrapper}
    >
      <View
        style={styles.newsWrapper}
      >
        <Title
          text='news'
          style={styles.titleText}
        />
        {
          loading ? 
            <LoadingSection
              style={null}
            />
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
            </>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newsPageWrapper: {
    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingLeft: 10,
    paddingRight: 10
  },

  newsWrapper: {
    width: '100%',
    minHeight: Dimensions.get('window').height - 220,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10,
  },
  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,

    marginLeft: 10,
    marginBottom: 20,

    width: '100%'
  }
})

export default NewsPage