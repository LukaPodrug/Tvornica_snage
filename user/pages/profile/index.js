import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import LoadingPage from '../loading'
import ProfileSection from '../../sections/profile'
import TrainingsSection from '../../sections/trainings'
import { getOwnDataAPI } from '../../API/user'
import { getActiveReservationsAPI } from '../../API/reservation'

function ProfilePage() {
  const [token] = useRecoilState(store.token)
  const [ownData, setOwnData] = useRecoilState(store.ownData)

  const [activeReservations, setActiveReservations] = useState([])

  const [loading, setLoading] = useState(true)

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

    async function getActiveReservations() {
      try {
        const activeReservationsResponse = await getActiveReservations(token)
        setActiveReservations(activeReservationsResponse.data)
        setLoading(false)
      }
      catch(error) {
        setLoading(false)
        return
      }
    }

    async function fetchAPI() {
      if(!ownData) {
        await getOwnData()
      }
      await getActiveReservations()
    }

    if(token) {
      fetchAPI()
    }
  }, [token])

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
  }
})

export default ProfilePage