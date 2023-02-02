import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'

function LoadingPage() {
    return (
        <View
            style={styles.wrapper}
        >
            <ActivityIndicator
                size='large'
                color='#90ee90'
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