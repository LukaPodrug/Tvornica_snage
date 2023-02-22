import { StyleSheet, View, Text } from 'react-native'
import Constants from 'expo-constants'

function Header() {
  return (
    <View 
      style={styles.wrapper}
    >
        <Text
          style={styles.headerTextWord1}
        >
          TVORNICA 
        </Text>
        <Text
          style={styles.headerTextWord2}
        >
          SNAGE
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',

    marginTop: Constants.statusBarHeight,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6e6',

    elevation: 8
  },

  headerTextWord1: {
    fontFamily: 'Norwester',
    fontSize: 45,
    color: '#000000',

    marginRight: 5
  },
  headerTextWord2: {
    fontFamily: 'Norwester',
    fontSize: 45,
    color: '#e04f5f',

    marginLeft: 5
  }
})

export default Header