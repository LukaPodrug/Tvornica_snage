import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'

import Title from '../../../../components/title'
import Button from '../../../../components/button'
import Info from '../../../../components/info'

function TrainingDetailsModal({ isOpen, close, coachFirstName, coachLastName, date, start, finish, room, capacity, level, title, regime, exercises }) {
    return (
        <Modal
            isVisible={isOpen}
            backdropOpacity={1}
        >
            <View
                style={styles.wrapper}
            >
                <View
                    style={styles.header}
                >
                    <Title
                        text='training details'
                        style={styles.titleText}
                    />
                    <Button
                        loading={false}
                        showMessage={false}
                        messageText={null}
                        work={close}
                        buttonText='close'
                        wrapperStyle={null}
                        buttonWrapperStyle={styles.buttonWrapper}
                        buttonTextStyle={styles.buttonText}
                        messageWrapperStyle={null}
                        messageTextStyle={null}
                    />
                </View>
                <View>
                    <View
                        style={styles.dataRow}
                    >
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='coach'
                                value={coachFirstName + ' ' + coachLastName}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='date'
                                value={date}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.dataRow}
                    >
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='start'
                                value={start}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='finish'
                                value={finish}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.dataRow}
                    >
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='room'
                                value={room}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='capacity'
                                value={capacity}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.dataRow}
                    >
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='level'
                                value={level}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='title'
                                value={title}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.dataRow}
                    >
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='regime'
                                value={regime}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                        <View
                            style={styles.data}
                        >
                            <Info
                                property='exercises'
                                value={exercises}
                                labelTextStyle={styles.infoLabelTextStyle}
                                valueTextStyle={styles.infoValueTextStyle}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff',

        flex: 0,

        padding: 15
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: 25
    },

    dataRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    data: {
        width: '50%',

        display: 'flex',
        justifyContent: 'flex-start',

        marginBottom: 10
    },
    
    titleText: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },

    buttonWrapper: {
        padding: 10,

        borderRadius: 10,

        backgroundColor: '#e04f5f'
    },
    buttonText: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#ffffff'
    },
    infoLabelTextStyle: {
        fontFamily: 'Ubuntu_400Regular',
        textTransform: 'uppercase',
        fontSize: 14
    },
    infoValueTextStyle: {
        fontFamily: 'Ubuntu_400Regular',
        fontSize: 18
    }
})

export default TrainingDetailsModal