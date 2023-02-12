import { gql } from '@apollo/client'

const blogPostsQuery = gql`
  query getBlogPosts($limit: Int, $offset: Int) {
    blogPostCollection(limit: $limit, skip: $offset) {
      total
      items {
        title
        categories
        content
        images: imageGalleryCollection {
          items {
            title,
            url
          }
        }
        videos: videoGalleryCollection {
          items {
            title
            url
          }
        }
        attachments: attachmentsCollection {
          items {
            title
            url
          }
        }
      }
    }
  }`

export {
    blogPostsQuery
}