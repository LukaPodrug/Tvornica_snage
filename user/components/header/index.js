import { View, Image } from 'react-native'

import header from '../../assets/images/header.png'

function Header({ wrapperStyle, headerImageStyle }) {
  return (
    <View 
      style={wrapperStyle}
    >
      <Image
        style={headerImageStyle}
        source={header}
      />
    </View>
  )
}

export default Header