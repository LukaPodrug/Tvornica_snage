import { View, Text } from 'react-native'
import { DonutChart } from 'react-native-circular-chart'

function StatisticsSection({ statistics, legendWrapperStyle, legendTabStyle, legendLabelTextStyle, legendValueTextStyle }) {
    return (
        <>
            <DonutChart
                data={statistics}
                strokeWidth={20}
                radius={90}
                type='round'
                startAngle={0}
                endAngle={360}
                animationType='fade'
                containerWidth={200}
                containerHeight={200}
                labelTitleStyle={{display: 'none'}}
                labelValueStyle={{display: 'none'}}
            />
            <View
                style={legendWrapperStyle}
            >
                {
                    statistics.map((statistic, index) => {
                        return (
                            <View
                                key={index}
                                style={[legendTabStyle, {backgroundColor: statistic.color}]}
                            >
                                <Text
                                    style={legendLabelTextStyle}
                                >
                                    {statistic.name}
                                </Text>
                                <Text
                                    style={legendValueTextStyle}
                                >
                                    {statistic.value}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        </>
    )
}

export default StatisticsSection