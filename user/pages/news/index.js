import { useEffect,  useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions} from 'react-native'
import { useQuery } from '@apollo/client'

import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import BlogPost from '../../components/blogPost'
import Button from '../../components/button'
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
              <>
                {
                  blogPosts.length === 0 ?
                    <View
                      style={styles.emptyNewsMessageWrapper}
                    >
                      <Text
                        style={styles.emptyNewsMessageText}
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
                            work={changeOffset}
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
  },

  emptyNewsMessageWrapper: {
    padding: 10,

    backgroundColor: '#e6e6e6',
    
    borderRadius: 10
  },
  emptyNewsMessageText: {
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

export default NewsPage