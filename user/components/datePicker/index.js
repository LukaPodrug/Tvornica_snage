import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native'

import leftArrowIcon from '../../assets/icons/left.png'
import rightArrowIcon from '../../assets/icons/right.png'

function DatePicker({ dateShow, changeDate }) {
    return (
        <View
            style={styles.wrapper}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={() => changeDate(-1)}
            >
                <Image
                    style={styles.image}
                    source={leftArrowIcon}
                />
            </TouchableOpacity>
            <Text
                style={styles.dateText}
            >
                {dateShow}
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => changeDate(1)}
            >
                <Image
                    style={styles.image}
                    source={rightArrowIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 20,
        marginLeft: 5
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,
        
        borderRadius: 15,

        backgroundColor: '#90ee90'
    },
    image: {
        width: 15,
        height: 15
    },

    dateText: {
        marginLeft: 10,
        marginRight: 10,

        fontFamily: 'Ubuntu_400Regular',
        fontSize: 16
    }
})

export default DatePicker