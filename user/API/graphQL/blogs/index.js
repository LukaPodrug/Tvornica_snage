import { gql } from '@apollo/client'

const blogPostsQuery = gql`
  {
    blogPostCollection {
      items {
        title
        categories
        content
        images: photoGalleryCollection {
          items {
            title,
            url
          }
        }
        videos:videoGalleryCollection {
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