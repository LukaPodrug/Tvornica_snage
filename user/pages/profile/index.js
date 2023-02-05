import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'
import { DonutChart } from 'react-native-circular-chart'

import store from '../../store'
import LoadingPage from '../loading'
import ProfileSection from '../../sections/profile'
import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import TrainingsSection from '../../sections/trainings'
import { getOwnDataAPI } from '../../API/user'
import { getActiveReservationsAPI, getOwnStatisticsAPI } from '../../API/reservation'
import { getAllCoachesDataAPI } from '../../API/coach'

function ProfilePage() {
  const isFocused = useIsFocused()

  const [token] = useRecoilState(store.token)
  const [ownData, setOwnData] = useRecoilState(store.ownData)
  const [allCoachesData, setAllCoachesData] = useRecoilState(store.allCoachesData)

  const [activeReservations, setActiveReservations] = useState([])
  const [ownStatistics, setOwnStatistics] = useState(null)

  const [loading, setLoading] = useState(true)
  const [statisticsLoading, setStatisticsLoading] = useState(true)
  const [reservationsLoading, setReservationsLoading] = useState(true)

  useEffect(() => {
    async function getOwnData() {
      try {
        const ownDataResponse = await getOwnDataAPI(token)
        setOwnData(ownDataResponse.data)
      }
      catch(error) {
        return
      }
    }

    async function getAllCoachesData() {
      try {
        const allCoachesDataResponse = await getAllCoachesDataAPI(token)
        setAllCoachesData(allCoachesDataResponse.data)
      }
      catch(error) {
        return
      }
    }

    async function getOwnStatistics() {
      try {
        setStatisticsLoading(true)
        const ownStatisticsResponse = await getOwnStatisticsAPI(token)
        const statisticsHelp = [
          {
            name: 'done',
            value: ownStatisticsResponse.data[0].reservationsDone,
            color: '#90ee90'
          },
          {
            name: 'skipped',
            value: ownStatisticsResponse.data[0].reservationsSkipped,
            color: '#e04f5f'
          },
          {
            name: 'unnanounced',
            value: ownStatisticsResponse.data[0].nonReservationsDone,
            color: '#fbec5d'
          },
        ]
        setOwnStatistics(statisticsHelp)
        setTimeout(() => {
          setStatisticsLoading(false)
        }, 300)
      }
      catch(error) {
        setTimeout(() => {
          setStatisticsLoading(false)
        }, 300)
        return
      }
    }

    async function getActiveReservations() {
      try {
        setReservationsLoading(true)
        const activeReservationsResponse = await getActiveReservationsAPI(token)
        const activeReservationsHelp = []
        activeReservationsResponse.data.forEach(reservation => {
          allCoachesData.forEach(coach => {
            if(reservation.coachId === coach.id) {
              reservation.coachImage = coach.image
              reservation.coachLastName = coach.lastName
            }
          })
          activeReservationsHelp.push(reservation)
        })
        setActiveReservations(activeReservationsHelp)
        setTimeout(() => {
          setLoading(false)
          setReservationsLoading(false)
        }, 300)
      }
      catch(error) {
        setTimeout(() => {
          setLoading(false)
          setReservationsLoading(false)
        }, 300)
        return
      }
    }

    async function fetchAPI() {
      if(!ownData && !allCoachesData) {
        await getOwnData()
        await getAllCoachesData()
      }
      if(allCoachesData) {
        await getOwnStatistics()
        await getActiveReservations()
      }
    }

    if(isFocused) {
      fetchAPI()
    }
  }, [isFocused, allCoachesData])

  if(loading) {
    return <LoadingPage style={styles.loadingPage}/>
  }

  return (
    <ScrollView>
      <View
        style={styles.profilePageWrapper}
      >
        <ProfileSection
          image={ownData.image}
          firstName={ownData.firstName}
          lastName={ownData.lastName}
          dateOfBirth={moment(ownData.dateOfBirth).format('DD/MM/YYYY')}
          username={ownData.username}
          membership={moment(ownData.membership).format('DD/MM/YYYY')}
          level={ownData.level}
          wrapperStyle={styles.profileSectionWrapper}
          imageStyle={styles.image}
          infoLabelTextStyle={styles.infoLabelText}
          infoValueTextStyle={styles.infoValueText}
        />
        <View
          style={styles.statisticsSectionWrapper}
        >
          <Title
            text='user statistics'
            style={styles.titleText}
          />
          {
            statisticsLoading ? 
              <LoadingSection/>
              :
              <DonutChart
                data={ownStatistics}
                strokeWidth={20}
                radius={90}
                type='round'
                startAngle={0}
                endAngle={360}
                animationType='fade'
                containerWidth={200}
                containerHeight={200}
                labelTitleStyle={styles.chartLabelText}
                labelValueStyle={styles.chartValueText}
              />
          }
          <View
            style={styles.chartLegendWrapper}
          >
            <View
              style={[styles.chartLegendTab, {backgroundColor: ownStatistics[0].color}]}
            >
              <Text
                style={styles.chartLegendLabelText}
              >
                {ownStatistics[0].name}
              </Text>
              <Text
                style={styles.chartLegendValueText}
              >
                {ownStatistics[0].value}
              </Text>
            </View>
            <View
              style={[styles.chartLegendTab, {backgroundColor: ownStatistics[1].color}]}
            >
              <Text
                style={styles.chartLegendLabelText}
              >
                {ownStatistics[1].name}
              </Text>
              <Text
                style={styles.chartLegendValueText}
              >
                {ownStatistics[1].value}
              </Text>
            </View>
            <View
              style={[styles.chartLegendTab, {backgroundColor: ownStatistics[2].color}]}
            >
              <Text
                style={styles.chartLegendLabelText}
              >
                {ownStatistics[2].name}
              </Text>
              <Text
                style={styles.chartLegendValueText}
              >
                {ownStatistics[2].value}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={styles.trainingsSectionWrapper}
        >
          <Title
            text='active reservations'
            style={styles.titleText}
          />
          {
            reservationsLoading ? 
              <LoadingSection
                style={null}
              />
              :
              <TrainingsSection
                trainings={activeReservations}
              />
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingPage: {
    paddingBottom: 80
  },
  profilePageWrapper: {
    display: 'flex',
    alignItems: 'center',

    minHeight: '100%',

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },

  profileSectionWrapper: {
    width: '100%',
    height: 200,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,

    borderRadius: 50,

    marginRight: 20
  },
  infoLabelText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 14
  },
  infoValueText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18
  },

  statisticsSectionWrapper: {
    width: '100%',
    height: 350,

    marginTop: 20,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#ffffff',

    borderRadius: 10,

    display: 'flex',
    alignItems: 'center'
  },
  chartLabelText: {
    display: 'none'
  },
  chartValueText: {
    display: 'none'
  },
  chartLegendWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',

    marginTop: 20
  },
  chartLegendTab: {
    width: '33%',

    paddingVertical: 5,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10
  },
  chartLegendLabelText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 14
  },
  chartLegendValueText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 20
  },

  trainingsSectionWrapper: {
    width: '100%',

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10,
  },
  scroll: {
    flex: 1
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,

    marginLeft: 10,
    marginBottom: 20,

    width: '100%'
  }
})

export default ProfilePage