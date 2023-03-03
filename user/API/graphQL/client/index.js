import { ApolloClient, InMemoryCache } from '@apollo/client'

import { CONTENTFUL_SPACE_ID, CONTENTFUL_TOKEN } from '@env'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: `${CONTENTFUL_SPACE_ID}`,
    cache,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer ${CONTENTFUL_TOKEN}`,
    }
})

export {
    cache,
    client
}