import { StyleSheet, View, ActivityIndicator } from 'react-native'

function LoadingPage({ style }) {
    return (
        <View
            style={[styles.wrapper, style && style]}
        >
            <ActivityIndicator
                size='large'
                color='#e04f5f'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',

        backgroundColor: '#000000',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingPage