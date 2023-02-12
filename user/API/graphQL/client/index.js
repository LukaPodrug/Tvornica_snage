import { ApolloClient, InMemoryCache } from '@apollo/client'

import { CONTENTFUL_SPACE_ID, CONTENFUL_ACCESS_TOKEN } from '@env'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    cache,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer ${CONTENFUL_ACCESS_TOKEN}`,
    }
})

export {
    cache,
    client
}