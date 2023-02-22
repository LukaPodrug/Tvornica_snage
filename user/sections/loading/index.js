import { View, ActivityIndicator } from 'react-native'

function LoadingSection({ wrapperStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <ActivityIndicator
                size='large'
                color='#e04f5f'
            />
        </View>
    )
}

export default LoadingSection