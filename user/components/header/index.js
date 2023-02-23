import { View, Text } from 'react-native'

function Header({ wrapperStyle, text1Style, text2Style }) {
  return (
    <View 
      style={wrapperStyle}
    >
        <Text
          style={text1Style}
        >
          TVORNICA 
        </Text>
        <Text
          style={text2Style}
        >
          SNAGE
        </Text>
    </View>
  )
}

export default Header