import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: `${Constants.expoConfig.extra.contentfulSpaceId}`,
    cache,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer ${Constants.expoConfig.extra.contentfulToken}`,
    }
})

export {
    cache,
    client
}