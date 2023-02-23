import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import Title from '../../components/title'
import DatePicker from '../../components/datePicker'
import LoadingSection from '../../sections/loading'
import TrainingsSection from '../../sections/trainings'
import { getTrainingsByDateAPI } from '../../API/REST/training'
import { getActiveReservationsAPI } from '../../API/REST/reservation'

import logo from '../../assets/images/logo.png'

function TrainingsPage() {
  const isFocused = useIsFocused()

  const [token] = useRecoilState(store.token)
  const [allCoachesData] = useRecoilState(store.allCoachesData)

  const [date, setDate] = useState(new Date(Date.now()))
  const [trainingsByDate, setTrainingsByDate] = useState([])

  const [dateShow, setDateShow] = useState(moment(date).format('DD/MM/YYYY'))
  const [trainingsLoading, setTrainingsLoading] = useState(true)
  const [reservationUpdated, setReservationUpdated] = useState(false)

  useEffect(() => {
    async function getTrainingsByDate(activeReservations) {
      try {
        const trainingsByDateResponse = await getTrainingsByDateAPI(token, moment(date).format('YYYY-MM-DD'))
        trainingsByDateResponse.data.forEach(training => {
          if(!training.numberOfReservations) {
            training.numberOfReservations = 0
          }

          training.reserved = false
          activeReservations.forEach(reservation => {
            if(training.id === reservation.trainingId) {
              training.reserved = true
            }
          })

          allCoachesData.forEach(coach => {
            if(training.coachId === coach.id) {
              training.coachImage = coach.image
              training.coachFirstName = coach.firstName
              training.coachLastName = coach.lastName
            }
          })
        })
        setTrainingsByDate(trainingsByDateResponse.data)
        setTrainingsLoading(false)
      }
      catch(error) {
        setTrainingsLoading(false)
        return
      }
    }

    async function getActiveReservations() {
      try {
        const activeReservationsResponse = await getActiveReservationsAPI(token)
        return activeReservationsResponse.data
      }
      catch(error) {
        return
      }
    }

    async function fetchAPI() {
      setTrainingsLoading(true)
      const activeReservations = await getActiveReservations()
      await getTrainingsByDate(activeReservations)
    }

    if(isFocused) {
      fetchAPI()
    }
  }, [isFocused, date, reservationUpdated])

  useEffect(() => {
    setDateShow(moment(new Date(date)).format('DD/MM/YYYY'))
  }, [date])

  function changeDate(value) {
    setDate(new Date(date.getTime() + value*24*60*60*1000))
  }

  return (
    <ScrollView>
      <View
        style={styles.wrapper}
      >
        <View
          style={styles.window}
        >
          <ImageBackground
            style={styles.backgroundImageWrapper}
            imageStyle={styles.backgroundImage}
            source={logo}
            resizeMode='contain'
          >
            <Title
              text='all trainings'
              textStyle={styles.titleText}
            />
            <DatePicker
              dateShow={dateShow}
              changeDate={changeDate}
              disabled={trainingsLoading}
              wrapperStyle={styles.datePickerWrapper}
              buttonWrapperStyle={styles.datePickerButtonWrapper}
              buttonDisabledStyle={styles.datePickerButtonDisabled}
              buttonIconStyle={styles.datePickerButtonIcon}
              textStyle={styles.datePickerText}
            />
            {
              trainingsLoading ?
                <LoadingSection
                  wrapperStyle={styles.loadingSectionWrapper}
                />
                :
                <TrainingsSection
                  trainings={trainingsByDate}
                  emptyMessage='no trainings scheduled on this date'
                  reservationUpdated={reservationUpdated}
                  changeReservationUpdated={setReservationUpdated}
                  changeLoading={setTrainingsLoading}
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
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',

    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },

  window: {
    width: '100%',
    minHeight: Dimensions.get('window').height - 220,

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 20,
    marginBottom: 20,

    backgroundColor: '#e6e6e6',

    borderRadius: 10,
  },

  backgroundImageWrapper: {
    minHeight: Dimensions.get('window').height - 260,
  },

  backgroundImage: {
    opacity: 0.1
  },
  
  titleText: {
    fontFamily: 'Ubuntu_700Bold',
    textTransform: 'uppercase',
    fontSize: 18,

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

  datePickerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 20,
    marginLeft: 5
  },

  datePickerButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 30,
    height: 30,
    
    borderRadius: 15,

    backgroundColor: '#e04f5f'
  },
  datePickerButtonDisabled: {
    backgroundColor: '#807d7d'
  },
  datePickerButtonIcon: {
    width: 15,
    height: 15
  },

  datePickerText: {
    marginLeft: 10,
    marginRight: 10,

    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16
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
  }
})

export default TrainingsPage