import 'dotenv/config'

const restApiUrl = process.env.REST_API_URL
const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID
const contentfulToken = process.env.CONTENTFUL_TOKEN

export default ({ config }) => {
    return {
        ...config,
        extra: {
            restApiUrl,
            contentfulSpaceId,
            contentfulToken,
            eas: {
                projectId: "6b96f4ad-a02c-47de-ad50-8ed3a3b0b705"
            }
        }
    }
}