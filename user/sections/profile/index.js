import { View, Image } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import Info from '../../components/info'

function ProfileSection({ image, firstName, lastName, dateOfBirth, username, membership, level, wrapperStyle, imageStyle, infoWrapperStyle, infoLabelTextStyle, infoValueTextStyle }) {
    return (
        <View
            style={wrapperStyle}
        >
            <Image
                style={imageStyle}
                source={{uri: image}}
            />
            <Grid>
                <Row>
                    <Col>
                        <Info
                            property='first name'
                            value={firstName}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='last name'
                            value={lastName}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Info
                            property='date of birth'
                            value={dateOfBirth}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='username'
                            value={username}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Info
                            property='membership'
                            value={membership}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='level'
                            value={level}
                            labelTextStyle={infoLabelTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
             </Grid>
        </View>
    )
}

export default ProfileSection