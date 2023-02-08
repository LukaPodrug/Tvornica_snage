import { StyleSheet, View, Text } from 'react-native'

function BlogPost({ text }) {
    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default BlogPost