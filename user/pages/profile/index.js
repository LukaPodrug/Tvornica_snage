import { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import ProfileSection from '../../sections/profile'
import Title from '../../components/title'
import LoadingSection from '../../sections/loading'
import TrainingsSection from '../../sections/trainings'
import { getOwnDataAPI } from '../../API/user'
import { getActiveReservationsAPI } from '../../API/reservation'
import { getAllCoachesDataAPI } from '../../API/coach'

function ProfilePage() {
  const isFocused = useIsFocused()

  const [token] = useRecoilState(store.token)
  const [ownData, setOwnData] = useRecoilState(store.ownData)
  const [allCoachesData, setAllCoachesData] = useRecoilState(store.allCoachesData)

  const [activeReservations, setActiveReservations] = useState([])

  const [loading, setLoading] = useState(true)
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

  trainingsSectionWrapper: {
    width: '100%',

    flexGrow: 1,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#ffffff',

    borderRadius: 10,

  },
  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,

    marginLeft: 10,
    marginBottom: 20
  },
  scroll: {
    flex: 1
  }
})

export default ProfilePage