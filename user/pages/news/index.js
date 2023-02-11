import { useEffect,  useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native'
import { useQuery } from '@apollo/client'

import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import BlogsSection from '../../sections/blogs'
import { blogPostsQuery } from '../../API/graphQL/blogs'

function NewsPage() {
  const blogPostsLimit = 5

  const { data, loading, fetchMore } = useQuery(blogPostsQuery, {fetchPolicy: 'no-cache', variables: {limit: blogPostsLimit, offset: blogPostsOffset}})

  const [blogPosts, setBlogPosts] = useState([])
  const [blogPostsOffset, setBlogPostsOffset] = useState(0)
  const [totalBlogPosts, setTotalBlogPosts] = useState(0)

  const [blogPostsLoading, setBlogPostsLoading] = useState(true)

  useEffect(() => {
    if(!loading && blogPosts.length === 0) {
      setBlogPosts(data.blogPostCollection.items)
      setTotalBlogPosts(data.blogPostCollection.total)
      setBlogPostsLoading(false)
    }
  }, [loading])

  useEffect(() => {
    async function fetchMoreBlogPosts() {
      try {
        await fetchMore(
          {
            variables: {
              offset: blogPostsOffset
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if(!fetchMoreResult) {
                setBlogPosts(blogPosts)
              }
              else {
                setBlogPosts([...blogPosts, ...fetchMoreResult.blogPostCollection.items])
              }
            }
          }
        )
      }
      catch(error) {
        return
      }
    }

    if(blogPostsOffset !== 0) {
      fetchMoreBlogPosts()
    }
  }, [blogPostsOffset])

  function changeOffset() {
    setBlogPostsOffset(blogPostsOffset + blogPostsLimit)
  }

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
              <BlogsSection
                blogPosts={blogPosts}
                totalBlogPosts={totalBlogPosts}
                loadMore={changeOffset}
              />
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