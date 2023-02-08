import { useEffect,  useState } from 'react'
import { StyleSheet, ScrollView, View, Dimensions} from 'react-native'
import { useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'

import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import BlogPost from '../../components/blogPost'
import { blogPostsQuery } from '../../API/graphQL/blogs'

function NewsPage() {
  const isFocused = useIsFocused()

  const { data, loading, refetch } = useQuery(blogPostsQuery)

  const [blogPosts, setBlogPosts] = useState([])

  const [blogPostsLoading, setBlogPostsLoading] = useState(true)

  useEffect(() => {
    async function fetchContentful() {
      try {
        await refetch()
        if(!loading) {
          setBlogPosts(data.blogPostCollection.items)
          setTimeout(() => {
            setBlogPostsLoading(false)
          }, 300)
        }
      }
      catch(error) {
        setTimeout(() => {
          setBlogPostsLoading(false)
        }, 300)
        return
      }
    }

    setBlogPostsLoading(true)
    fetchContentful()
  }, [isFocused])

  return (
    <ScrollView>
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
            blogPostsLoading ? 
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  newsPageWrapper: {
    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 80
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