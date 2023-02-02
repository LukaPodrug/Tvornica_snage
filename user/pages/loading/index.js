import { StyleSheet, View, ActivityIndicator } from 'react-native'

function LoadingPage({ style }) {
    return (
        <View
            style={[styles.loadingPageWrapper, style && style]}
        >
            <ActivityIndicator
                size='large'
                color='#90ee90'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingPageWrapper: {
        width: '100%',
        height: '100%',

        backgroundColor: '#000000',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingPage