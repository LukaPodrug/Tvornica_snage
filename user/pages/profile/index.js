import { StyleSheet, View, Text } from 'react-native'

function ProfilePage() {
  return (
    <View
      style={styles.wrapper}
    >
      <Text>Profile Page</Text>
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

export default ProfilePage