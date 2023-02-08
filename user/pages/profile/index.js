import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import LoadingSection from '../../sections/loading'
import Title from '../../components/title'
import ProfileSection from '../../sections/profile'
import Message from '../../components/message'
import StatisticsSection from '../../sections/statistics'
import TrainingsSection from '../../sections/trainings'
import { getOwnDataAPI } from '../../API/REST/user'
import { getActiveReservationsAPI, getOwnStatisticsAPI } from '../../API/REST/reservation'
import { getAllCoachesDataAPI } from '../../API/REST/coach'

function ProfilePage() {
  const isFocused = useIsFocused()

  const [token] = useRecoilState(store.token)
  const [ownData, setOwnData] = useRecoilState(store.ownData)
  const [allCoachesData, setAllCoachesData] = useRecoilState(store.allCoachesData)

  const [activeReservations, setActiveReservations] = useState([])
  const [ownStatistics, setOwnStatistics] = useState(null)

  const [loading, setLoading] = useState(true)
  const [reservationsLoading, setReservationsLoading] = useState(true)
  const [reservationUpdated, setReservationUpdated] = useState(false)

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
        const ownStatisticsResponse = await getOwnStatisticsAPI(token)
        const statisticsHelp = [
          {
            name: 'done',
            value: ownStatisticsResponse.data[0].reservationsDone === 0 ? 0.0000001 : ownStatisticsResponse.data[0].reservationsDone,
            color: '#90ee90'
          },
          {
            name: 'skipped',
            value: ownStatisticsResponse.data[0].reservationsSkipped === 0 ? 0.0000001 : ownStatisticsResponse.data[0].reservationsSkipped,
            color: '#e04f5f'
          },
          {
            name: 'unnanounced',
            value: ownStatisticsResponse.data[0].nonReservationsDone === 0 ? 0.0000001 : ownStatisticsResponse.data[0].nonReservationsDone,
            color: '#fbec5d'
          },
        ]
        setOwnStatistics(statisticsHelp)
      }
      catch(error) {
        return
      }
    }

    async function getActiveReservations() {
      try {
        const activeReservationsResponse = await getActiveReservationsAPI(token)
        const activeReservationsHelp = []
        activeReservationsResponse.data.forEach(reservation => {
          reservation.reserved = true
          allCoachesData.forEach(coach => {
            if(reservation.coachId === coach.id) {
              reservation.coachImage = coach.image
              reservation.coachFirstName = coach.firstName
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
      if(allCoachesData && !ownStatistics) {
        await getOwnStatistics()
      }
      setReservationsLoading(true)
      await getActiveReservations()
    }

    if(isFocused) {
      fetchAPI()
    }
  }, [isFocused, allCoachesData, reservationUpdated])

  if(loading) {
    return (
      <LoadingPage 
        style={styles.loadingPage}
      />
    )
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
        {
          moment(new Date(ownData.dateOfBirth)).format('DD/MM') === moment(new Date(Date.now())).format('DD/MM') &&
            <Message
              text={`Happy birthday ${ownData.firstName}!`}
              wrapperStyle={[styles.messageWrapper, {backgroundColor: '#90ee90'}]}
              textStyle={styles.messageText}
            />
        }
        {
          (new Date(ownData.membership) > new Date(Date.now()) && new Date(ownData.membership) < new Date(Date.now() + 5*24*60*60*1000)) &&
            <Message
              text='Your membership is due to expire in 5 days or less. To continue using our gym please renew membership with our staff.'
              wrapperStyle={[styles.messageWrapper, {backgroundColor: '#fbec5d'}]}
              textStyle={styles.messageText}
            />
        }
        {
          new Date(ownData.membership) < new Date(Date.now()) &&
            <Message
              text='Your membership expired. To continue using our gym please renew membership with our staff.'
              wrapperStyle={[styles.messageWrapper, {backgroundColor: '#e04f5f'}]}
              textStyle={styles.messageText}
            />
        }
        {
          (ownStatistics[0].value >= 1 || ownStatistics[1].value >= 1 || ownStatistics[2].value >= 1) &&
          <View
            style={styles.statisticsSectionWrapper}
          >
            <Title
              text='user statistics'
              style={styles.titleText}
            />
            <StatisticsSection
              statistics={ownStatistics}
              legendWrapperStyle={styles.chartLegendWrapper}
              legendTabStyle={styles.chartLegendTab}
              legendLabelTextStyle={styles.chartLegendLabelText}
              legendValueTextStyle={styles.chartValueText}
            />
          </View>
        }
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
                emptyMessage='no active reservations'
                reservationUpdated={reservationUpdated}
                changeReservationUpdated={setReservationUpdated}
                changeLoading={setReservationsLoading}
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

    minHeight: Dimensions.get('window').height - 100,

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

  messageWrapper: {
    width: '100%',

    marginTop: 20,

    padding: 20,

    borderRadius: 10
  },
  messageText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
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
  chartLegendWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20
  },
  chartLegendTab: {
    width: '32%',

    paddingVertical: 5,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10
  },
  chartLegendLabelText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 12
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