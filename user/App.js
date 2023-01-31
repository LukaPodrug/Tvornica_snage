import { StyleSheet, View, Text } from 'react-native'

export default function App() {
  return (
    <View 
      style={styles.wrapper}
    >
      <Text>
        TVORNICA SNAGE USER APP
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  }
})
