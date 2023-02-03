import { StyleSheet, View, ActivityIndicator } from 'react-native'

function LoadingSection({ style }) {
    return (
        <View
            style={[styles.loadingSectionWrapper, style && style]}
        >
            <ActivityIndicator
                size='large'
                color='#90ee90'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingSectionWrapper: {
        width: '100%',
        
        flexGrow: 1,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoadingSection