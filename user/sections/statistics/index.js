import { View, Text } from 'react-native'
import PieChart from 'react-native-pie-chart'

function StatisticsSection({ statistics, legendWrapperStyle, legendTabWrapperStyle, legendPropertyTextStyle, legendValueTextStyle }) {
    return (
        <>
            <PieChart
                widthAndHeight={200}
                series={[statistics[0].value, statistics[1].value, statistics[2].value]}
                sliceColor={[statistics[0].color, statistics[1].color, statistics[2].color]}
                coverRadius={0.65}
                coverFill={null}
            />
            <View
                style={legendWrapperStyle}
            >
                {
                    statistics.map((statistic, index) => {
                        return (
                            <View
                                key={index}
                                style={[legendTabWrapperStyle, {backgroundColor: statistic.color}]}
                            >
                                <Text
                                    style={legendPropertyTextStyle}
                                >
                                    {statistic.name}
                                </Text>
                                <Text
                                    style={legendValueTextStyle}
                                >
                                    {Math.floor(statistic.value)}
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