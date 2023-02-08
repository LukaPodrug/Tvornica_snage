import { StyleSheet, View, Text } from 'react-native'

function BlogPost({ title, categories, content, images, videos, attachments }) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{categories}</Text>
            <Text>{content}</Text>
            <Text>{images.length}</Text>
            <Text>{videos.length}</Text>
            <Text>{attachments.length}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default BlogPost