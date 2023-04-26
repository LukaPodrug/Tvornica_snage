import { useEffect, useState, useRef } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

import store from '../../store'
import LoadingPage from '../loading'
import LoadingSection from '../../sections/loading'
import Title from '../../components/title'
import ProfileSection from '../../sections/profile'
import Button from '../../components/button'
import Message from '../../components/message'
import StatisticsSection from '../../sections/statistics'
import PartnersSection from '../../sections/partners'
import TrainingsSection from '../../sections/trainings'
import ProfileDeleteModal from '../modals/profile'
import { getOwnDataAPI } from '../../API/REST/user'
import { deleteAPI } from '../../API/REST/auth'
import { getActiveReservationsAPI, getOwnStatisticsAPI } from '../../API/REST/reservation'
import { getAllCoachesDataAPI } from '../../API/REST/coach'
import { getPartnersDataAPI } from '../../API/REST/partner'

import logo from '../../assets/images/logo.png'

function ProfilePage() {
  const isFocused = useIsFocused()

  const pageRef = useRef(null)

  const [token, setToken] = useRecoilState(store.token)
  const [, setLoggedIn] = useRecoilState(store.loggedIn)
  const [ownData, setOwnData] = useRecoilState(store.ownData)
  const [allCoachesData, setAllCoachesData] = useRecoilState(store.allCoachesData)
  const [partnersData, setPartnersData] = useRecoilState(store.partnersData)

  const [activeReservations, setActiveReservations] = useState([])
  const [ownStatistics, setOwnStatistics] = useState(null)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [reservationsLoading, setReservationsLoading] = useState(true)
  const [reservationUpdated, setReservationUpdated] = useState(false)
  const [accountDeleting, setAccountDeleting] = useState(false)

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

    async function getPartnersData() {
      try {
        const partnersDataResponse = await getPartnersDataAPI(token)
        setPartnersData(partnersDataResponse.data)
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
        setReservationsLoading(false)
      }
      catch(error) {
        setReservationsLoading(false)
        return
      }
    }

    async function fetchAPI() {
      if(!ownData && !allCoachesData && !partnersData) {
        await getOwnData()
        await getAllCoachesData()
        await getPartnersData()
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

  useEffect(() => {
    if(isFocused && pageRef.current) {
      pageRef.current.scrollTo({
        y: 0,
        animated: false
      })
    }
  }, [isFocused])

  function openDeleteModal() {
    setDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false)
  }

  async function logout() {
    try {
      setToken(null)
      setLoggedIn(false)
      setOwnData(null)
      setAllCoachesData(null)
      await AsyncStorage.removeItem('token')
    }
    catch(error) {
      return
    }
  }

  async function deleteAccount() {
    try {
      setAccountDeleting(true)
      await deleteAPI(token)
      setToken(null)
      setLoggedIn(false)
      setOwnData(null)
      setAllCoachesData(null)
      await AsyncStorage.removeItem('token')
      setAccountDeleting(false)
    }
    catch(error) {
      setAccountDeleting(false)
      return
    }
  }

  if(!ownData || !ownStatistics || !partnersData) {
    return (
      <LoadingPage 
        style={styles.loadingPage}
      />
    )
  }

  return (
    <ScrollView
      ref={pageRef}
    >
      <View
        style={styles.wrapper}
      >
        <ProfileSection
          image={ownData.image}
          firstName={ownData.firstName}
          lastName={ownData.lastName}
          dateOfBirth={ownData.dateOfBirth === null ? '-' : moment(ownData.dateOfBirth).format('DD/MM/YYYY')}
          username={ownData.username}
          membership={moment(ownData.membership).format('DD/MM/YYYY')}
          level={ownData.level}
          wrapperStyle={styles.profileSectionWindow}
          imageStyle={styles.profileSectionImage}
          infoPropertyTextStyle={styles.profileSectionInfoPropertyText}
          infoValueTextStyle={styles.profileSectionInfoValueText}
        />
        {
          moment(new Date(ownData.dateOfBirth)).format('DD/MM') === moment(new Date(Date.now())).format('DD/MM') &&
            <Message
              text={`Happy birthday ${ownData.firstName}!`}
              wrapperStyle={[styles.messageWrapper, styles.messageWrapperSuccess]}
              textStyle={styles.messageText}
            />
        }
        {
          (new Date(ownData.membership) > new Date(Date.now()) && new Date(ownData.membership) < new Date(Date.now() + 5*24*60*60*1000)) &&
            <Message
              text='Your membership is due to expire in 5 days or less. To continue using our gym please renew membership with our staff.'
              wrapperStyle={[styles.messageWrapper, styles.messageWrapperWarning]}
              textStyle={styles.messageText}
            />
        }
        {
          new Date(ownData.membership) < new Date(Date.now()) &&
            <Message
              text='Your membership expired. To continue using our gym please renew membership with our staff.'
              wrapperStyle={[styles.messageWrapper, styles.messageWrapperError]}
              textStyle={styles.messageText}
            />
        }
        {
          (ownStatistics[0].value >= 1 || ownStatistics[1].value >= 1 || ownStatistics[2].value >= 1) &&
          <View
            style={styles.statisticsSectionWindow}
          >
            <ImageBackground
              style={styles.backgroundImageWrapper}
              imageStyle={styles.backgroundImage}
              source={logo}
              resizeMode='contain'
            >
              <Title
                text='user statistics'
                textStyle={styles.titleText}
              />
              <StatisticsSection
                statistics={ownStatistics}
                legendWrapperStyle={styles.chartLegendWrapper}
                legendTabWrapperStyle={styles.chartLegendTabWrapper}
                legendPropertyTextStyle={styles.chartLegendPropertyText}
                legendValueTextStyle={styles.chartLegendValueText}
              />
            </ImageBackground>
          </View>
        }
        <View
          style={styles.partnersWindow}
        >
          <Title
            text='partners'
            textStyle={styles.titleText}
          />
          <PartnersSection
            partners={partnersData}
            emptyMessage='no active partners'
            emptyMessageWrapperStyle={styles.partnersSectionEmptyMessageWrapper}
            emptyMessageTextStyle={styles.partnersSectionEmptyMessageText}
            partnerWrapperStyle={styles.partnerWrapper}
            partnerTextStyle={styles.partnerText}
          />
        </View>
        <View
          style={styles.trainingsSectionWindow}
        >
          <Title
            text='active reservations'
            textStyle={styles.titleText}
          />
          {
            reservationsLoading ? 
              <LoadingSection
                wrapperStyle={styles.loadingSectionWrapper}
              />
              :
              <TrainingsSection
                trainings={activeReservations}
                emptyMessage='no active reservations'
                reservationUpdated={reservationUpdated}
                changeReservationUpdated={setReservationUpdated}
                changeLoading={setReservationsLoading}
                emptyMessageWrapperStyle={styles.trainingsSectionEmptyMessageWrapper}
                emptyMessageTextStyle={styles.trainingsSectionEmptyMessageText}
                trainingWrapperStyle={styles.trainingWrapper}
                trainingDataWrapperStyle={styles.trainingDataWrapper}
                trainingMenuWrapperStyle={styles.trainingMenuWrapper}
                trainingSectionWrapperStyle={styles.trainingSectionWrapper}
                trainingCoachSectionWrapperStyle={styles.trainingCoachSectionWrapper}
                trainingSectionImageStyle={styles.trainingSectionImage}
                trainingCoachSectionImageStyle={styles.trainingCoachSectionImage}
                trainingSectionPropertyTextStyle={styles.trainingSectionPropertyText}
                trainingSectionValueTextStyle={styles.trainingSectionValueText}
                trainingCapacitySectionWrapper={styles.trainingCapacitySectionWrapper}
                trainingButtonWrapperStyle={styles.trainingButtonWrapper}
                trainingButtonWrapperDisabledStyle={styles.trainingButtonWrapperDisabled}
                trainingButtonWrapperHiddenStyle={styles.trainingButtonWrapperHidden}
                trainingButtonIconStyle={styles.trainingButtonIcon}
                trainingDetailsModalWrapperStyle={styles.trainingDetailsModalWrapperStyle}
                trainingDetailsModalHeaderWrapperStyle={styles.trainingDetailsModalHeaderWrapperStyle}
                trainingDetailsModalTitleTextStyle={styles.trainingDetailsModalTitleTextStyle}
                trainingDetailsModalExitButtonWrapperStyle={styles.trainingDetailsModalExitButtonWrapperStyle}
                trainingDetailsModalExitButtonTextStyle={styles.trainingDetailsModalExitButtonTextStyle}
                trainingDetailsModalDataRowWrapperStyle={styles.trainingDetailsModalDataRowWrapperStyle}
                trainingDetailsModalDataWrapperStyle={styles.trainingDetailsModalDataWrapperStyle}
                trainingDetailsModalDataPropertyTextStyle={styles.trainingDetailsModalDataPropertyTextStyle}
                trainingDetailsModalDataValueTextStyle={styles.trainingDetailsModalDataValueTextStyle}
              />
          }
        </View>
        <Button
          loading={false}
          showMessage={false}
          messageText={null}
          work={logout}
          buttonText='logout'
          wrapperStyle={styles.logoutButtonMessageWrapper}
          buttonWrapperStyle={styles.logoutButtonWrapper}
          buttonTextStyle={styles.logoutButtonText}
          messageWrapperStyle={null}
          messageTextStyle={null}
        />
        <Button
          loading={false}
          showMessage={false}
          messageText={null}
          work={openDeleteModal}
          buttonText='delete account'
          wrapperStyle={styles.deleteButtonMessageWrapper}
          buttonWrapperStyle={styles.deleteButtonWrapper}
          buttonTextStyle={styles.deleteButtonText}
          messageWrapperStyle={null}
          messageTextStyle={null}
        />
      </View>
      <ProfileDeleteModal
        isOpen={deleteModalOpen}
        close={closeDeleteModal}
        remove={deleteAccount}
        deleting={accountDeleting}
        wrapperStyle={styles.deleteModalWrapper}
        headerWrapperStyle={styles.deleteModalHeaderWrapper}
        titleTextStyle={styles.deleteModalTitleTextStyle}
        exitButtonWrapperStyle={styles.deleteModalExitButtonWrapperStyle}
        exitButtonTextStyle={styles.deleteModalExitButtonTextStyle}
        deleteButtonMessageWrapperStyle={styles.deleteModalDeleteButtonMessageWrapper}
        deleteButtonWrapperStyle={styles.deleteModalDeleteButtonWrapper}
        deleteButtonTextStyle={styles.deleteModalDeleteButtonTextStyle}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingPage: {
    paddingBottom: 80
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',

    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },

  profileSectionWindow: {
    width: '100%',
    height: 200,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileSectionImage: {
    width: 100,
    height: 100,

    borderRadius: 50,

    marginRight: 20
  },
  profileSectionInfoPropertyText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 14
  },
  profileSectionInfoValueText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18
  },

  messageWrapper: {
    width: '100%',

    marginTop: 20,

    padding: 20,

    borderRadius: 10
  },
  messageWrapperSuccess: {
    backgroundColor: '#90ee90'
  },
  messageWrapperWarning: {
    backgroundColor: '#fbec5d'
  },
  messageWrapperError: {
    backgroundColor: '#e04f5f'
  },
  messageText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
  },

  statisticsSectionWindow: {
    width: '100%',
    height: 350,

    marginTop: 20,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,

    display: 'flex',
    alignItems: 'center'
  },

  backgroundImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  backgroundImage: {
    opacity: 0.1
  },

  chartLegendWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 20
  },
  chartLegendTabWrapper: {
    width: '32%',

    paddingVertical: 5,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10
  },
  chartLegendPropertyText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 12
  },
  chartLegendValueText: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 15
  },

  partnersWindow: {
    width: '100%',

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,
  },
  partnerWrapper: {
    width: '100%',

    borderRadius: 10,

    backgroundColor: '#ffffff',

    padding: 9
  },
  partnerText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
  },
  partnersSectionEmptyMessageWrapper: {
    width: '100%',

    borderRadius: 10,

    backgroundColor: '#ffffff',

    padding: 9
  },
  partnersSectionEmptyMessageText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
  },

  trainingsSectionWindow: {
    width: '100%',

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,
  },

  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,
    
    alignSelf: 'flex-start',

    marginLeft: 10,
    marginBottom: 20,

    width: '100%'
  },

  loadingSectionWrapper: {
    width: '100%',
    
    flexGrow: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  trainingsSectionEmptyMessageWrapper: {
    width: '100%',

    borderRadius: 10,

    backgroundColor: '#ffffff',

    padding: 9
  },
  trainingsSectionEmptyMessageText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 14
  },

  trainingWrapper: {
    display: 'flex',
    flexDirection: 'row',

    width: '100%',

    backgroundColor: '#ffffff',

    marginBottom: 10,

    borderRadius: 10,

    padding: 5
  },

  trainingDataWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    flexGrow: 1,

    marginRight: 5
  },
  trainingSectionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trainingCoachSectionWrapper: {
    width: 75
  },
  trainingSectionImage: {
    width: 30,
    height: 30
  },
  trainingCoachSectionImage: {
    borderRadius: 15
  },
  trainingSectionPropertyText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  trainingSectionValueText: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  trainingCapacitySectionWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  trainingMenuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 5
  },
  trainingButtonWrapper: {
    width: 30,
    height: 30,

    borderRadius: 15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 5,
    marginRight: 5,

    backgroundColor: '#e04f5f'
  },
  trainingButtonWrapperDisabled: {
    backgroundColor: '#807d7d'
  },
  trainingButtonWrapperHidden: {
    opacity: 0
  },
  trainingButtonIcon: {
    width: 20,
    height: 20
  },

  trainingDetailsModalWrapperStyle: {
    backgroundColor: '#ffffff',

    flex: 0,

    padding: 15,

    borderRadius: 10
  },

  trainingDetailsModalHeaderWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 25
  },

  trainingDetailsModalDataRowWrapperStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  trainingDetailsModalDataWrapperStyle: {
    width: '50%',

    display: 'flex',
    justifyContent: 'flex-start',

    marginBottom: 10
  },

  trainingDetailsModalTitleTextStyle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },

  trainingDetailsModalExitButtonWrapperStyle: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: '#e04f5f'
  },
  trainingDetailsModalExitButtonTextStyle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#000000'
  },
  trainingDetailsModalDataPropertyTextStyle: {
    fontFamily: 'Ubuntu_400Regular',
    textTransform: 'uppercase',
    fontSize: 14
  },
  trainingDetailsModalDataValueTextStyle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18
  },

  logoutButtonMessageWrapper: {
    width: '100%'
  },
  logoutButtonWrapper: {
    backgroundColor: '#fbec5d',

    marginBottom: 20,

    padding: 20,

    borderRadius: 10
  },
  logoutButtonText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 17
  },


  deleteButtonMessageWrapper: {
    width: '100%'
  },
  deleteButtonWrapper: {
    backgroundColor: '#e04f5f',

    marginBottom: 20,

    padding: 20,

    borderRadius: 10
  },
  deleteButtonText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 17
  },

  deleteModalWrapper: {
    backgroundColor: '#ffffff',

    flex: 0,

    padding: 15,

    borderRadius: 10
  },
  deleteModalHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 25
  },
  deleteModalTitleTextStyle: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  deleteModalExitButtonWrapperStyle: {
    padding: 10,

    borderRadius: 10,

    backgroundColor: '#e04f5f'
  },
  deleteModalExitButtonTextStyle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#000000'
  },
  deleteModalDeleteButtonMessageWrapper: {
    width: '100%'
  },
  deleteModalDeleteButtonWrapper: {
    backgroundColor: '#e04f5f',

    marginTop: 20,

    padding: 20,

    borderRadius: 10
  },
  deleteModalDeleteButtonTextStyle: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 17
  }
})

export default ProfilePage