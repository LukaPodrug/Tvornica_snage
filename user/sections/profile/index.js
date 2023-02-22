import { View, Image } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'

import Info from '../../components/info'

function ProfileSection({ image, firstName, lastName, dateOfBirth, username, membership, level, wrapperStyle, imageStyle, infoPropertyTextStyle, infoValueTextStyle }) {
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
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='last name'
                            value={lastName}
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Info
                            property='date of birth'
                            value={dateOfBirth}
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='username'
                            value={username}
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Info
                            property='membership'
                            value={membership}
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                    <Col>
                        <Info
                            property='level'
                            value={level}
                            propertyTextStyle={infoPropertyTextStyle}
                            valueTextStyle={infoValueTextStyle}
                        />
                    </Col>
                </Row>
             </Grid>
        </View>
    )
}

export default ProfileSection