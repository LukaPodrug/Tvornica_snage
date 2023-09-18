import { gql } from '@apollo/client'

const blogPostsQuery = gql`
  query getBlogPosts($limit: Int, $offset: Int, $userId: String) {
    blogPostCollection(limit: $limit, skip: $offset, where: {users_contains_some: [$userId, "0"]}) {
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