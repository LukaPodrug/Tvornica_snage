import { StyleSheet, View, Text } from 'react-native'

function NewsPage() {
  return (
    <View
      style={styles.wrapper}
    >
      <Text>News page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    flexGrow: 1,

    backgroundColor: '#000000'
  }
})

export default NewsPage