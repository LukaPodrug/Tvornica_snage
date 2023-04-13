import { useEffect,  useState } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Dimensions, Platform } from 'react-native'
import { useQuery } from '@apollo/client'

import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import BlogsSection from '../../sections/blogs'
import { blogPostsQuery } from '../../API/graphQL/blogs'

import logo from '../../assets/images/logo.png'

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
        style={styles.wrapper}
      >
        <View
          style={styles.window}
        >
          <ImageBackground
            style={styles.backgroundImageWrapper}
            imageStyle={styles.backgroundImage}
            source={logo}
            resizeMode='contain'
          >
            <Title
              text='news'
              textStyle={styles.titleText}
            />
            {
              blogPostsLoading ? 
                <LoadingSection
                  wrapperStyle={styles.loadingSectionWrapper}
                />
                :
                <BlogsSection
                  blogPosts={blogPosts}
                  totalBlogPosts={totalBlogPosts}
                  loadMore={changeOffset}
                  blogsSectionEmptyMessageWrapperStyle={styles.blogsSectionEmptyMessageWrapper}
                  blogsSectionEmptyMessageTextStyle={styles.blogsSectionEmptyMessageText}
                  loadMoreBlogsButtonWrapperStyle={styles.loadMoreBlogsButtonWrapperStyle}
                  loadMoreBlogsButtonTextStyle={styles.loadMoreBlogsButtonTextStyle}
                  blogPostWrapperStyle={styles.blogPostWrapper}
                  blogPostTitleTextStyle={styles.blogPostTitleText}
                  blogPostCategoriesTextStyle={styles.blogPostCategoriesText}
                  blogPostAttachmentsWrapperStyle={styles.blogPostAttachmentsWrapper}
                  blogPostAttachmentWrapperStyle={styles.blogPostAttachmentWrapper}
                  blogPostAttachmentIconStyle={styles.blogPostAttachmentIcon}
                  blogPostAttachmentTextStyle={styles.blogPostAttachmentText}
                  blogPostModalWrapperStyle={styles.blogPostModalWrapper}
                  blogPostModalHeaderWrapperStyle={styles.blogPostModalHeaderWrapper}
                  blogPostModalTitleTextStyle={styles.blogPostModalTitleText}
                  blogPostModalExitButtonWrapperStyle={styles.blogPostModalExitButtonWrapper}
                  blogPostModalExitButtonTextStyle={styles.blogPostModalExitButtonText}
                  blogPostModalSectionWrapper={styles.blogPostModalSectionWrapper}
                  blogPostModalSubtitleTextStyle={styles.blogPostModalSubtitleText}
                  blogPostModalContentTextStyle={styles.blogPostModalContentText}
                  blogPostModalAssetButtonWrapperStyle={styles.blogPostModalAssetButtonWrapper}
                  blogPostModalAssetButtonTextStyle={styles.blogPostModalAssetButtonText}
                  blogPostModalPhotoGalleryHeaderWrapperStyle={styles.blogPostModalPhotoGalleryHeaderWrapper}
                  blogPostModalVideoGalleryHeaderWrapperStyle={styles.blogPostModalVideoGalleryHeaderWrapper}
                  blogPostModalGalleryExitButtonWrapperStyle={styles.blogPostModalGalleryExitButtonWrapper}
                  blogPostModalGalleryExitButtonTextStyle={styles.blogPostModalGalleryExitButtonText}
                />
            }
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 80
  },

  window: {
    width: '100%',
    minHeight: Dimensions.get('window').height - 220,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10
  },

  backgroundImageWrapper: {
    minHeight: Dimensions.get('window').height - 260,
  },

  backgroundImage: {
    opacity: 0.1
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,

    marginLeft: 10,
    marginBottom: 20,

    width: '100%'
  },

  loadingSectionWrapper: {
    width: '100%',
    
    flexGrow: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  blogsSectionEmptyMessageWrapper: {
    padding: 10,

    backgroundColor: '#ffffff',
    
    borderRadius: 10
  },
  blogsSectionEmptyMessageText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 15,
  },

  loadMoreBlogsButtonWrapperStyle: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: '#e04f5f',

    marginTop: 5,
    marginBottom: 5
  },

  loadMoreBlogsButtonTextStyle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000000'
  },

  blogsSectionButtonWrapper: {
    padding: 10,
    
    borderRadius: 10,

    backgroundColor: '#90ee90',

    marginTop: 5,
    marginBottom: 5
  },
  blogsSectionButtonText: {
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
  blogPostTitleText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,

    marginBottom: 10
  },
  blogPostCategoriesText: {
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
  blogPostAttachmentIcon: {
    width: 20,
    height: 20,

    marginRight: 5
  },
  blogPostAttachmentText: {
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

    marginTop: 10,
    marginBottom: 10
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
  blogPostModalPhotoGalleryHeaderWrapper: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginRight: 20,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  blogPostModalVideoGalleryHeaderWrapper: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
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

export default NewsPage