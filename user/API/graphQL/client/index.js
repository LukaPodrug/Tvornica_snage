import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/rnh92ge3lpy9',
    cache,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer 3ALv7Q4R7peqUwmJu7VdBOusNAXSi1o3EmDxEWNVD9Y`,
    }
})

export {
    cache,
    client
}