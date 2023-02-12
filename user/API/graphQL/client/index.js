import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'https://graphql.contentful.com/content/v1/spaces/txvfo602f8md',
    cache,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer qAXnH8ZxMG3NK7oPukY2mYtvWnYLeSLqe-0No4DPhQQ`,
    }
})

export {
    cache,
    client
}