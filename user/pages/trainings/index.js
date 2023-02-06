import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useRecoilState } from 'recoil'
import moment from 'moment'

import store from '../../store'
import Title from '../../components/title'
import DatePicker from '../../components/datePicker'
import LoadingSection from '../../sections/loading'
import TrainingsSection from '../../sections/trainings'
import { getTrainingsByDateAPI } from '../../API/training'

function TrainingsPage() {
  const isFocused = useIsFocused()

  const [token] = useRecoilState(store.token)
  const [allCoachesData] = useRecoilState(store.allCoachesData)

  const [date, setDate] = useState(new Date(Date.now()))
  const [trainingsByDate, setTrainingsByDate] = useState([])

  const [dateShow, setDateShow] = useState(moment(date).format('DD/MM/YYYY'))
  const [trainingsLoading, setTrainingsLoading] = useState(true)

  useEffect(() => {
    async function getTrainingsByDate() {
      try {
        const trainingsByDateResponse = await getTrainingsByDateAPI(token, moment(date).format('YYYY-MM-DD'))
        trainingsByDateResponse.data.forEach(training => {
          if(!training.numberOfReservations) {
            training.numberOfReservations = 0
          }
          allCoachesData.forEach(coach => {
            if(training.coachId === coach.id) {
              training.coachImage = coach.image
              training.coachFirstName = coach.firstName
              training.coachLastName = coach.lastName
            }
          })
        })
        setTrainingsByDate(trainingsByDateResponse.data)
        setTimeout(() => {
          setTrainingsLoading(false)
        }, 300)
      }
      catch(error) {
        setTimeout(() => {
          setTrainingsLoading(false)
        }, 300)
        return
      }
    }

    async function fetchAPI() {
      setTrainingsLoading(true)
      await getTrainingsByDate()
    }

    if(isFocused) {
      fetchAPI()
    }
  }, [isFocused, date])

  useEffect(() => {
    setDateShow(moment(new Date(date)).format('DD/MM/YYYY'))
  }, [date])

  function changeDate(value) {
    setDate(new Date(date.getTime() + value*24*60*60*1000))
  }

  return (
    <ScrollView>
      <View
        style={styles.trainingsPageWrapper}
      >
        <View
          style={styles.trainingsWrapper}
        >
          <Title
            text='all trainings'
            style={styles.titleText}
          />
          <DatePicker
            dateShow={dateShow}
            changeDate={changeDate}
          />
          {
            trainingsLoading ?
              <LoadingSection
                style={null}
              />
              :
              <TrainingsSection
                trainings={trainingsByDate}
                emptyMessage='no trainings scheduled on this date'
              />
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  trainingsPageWrapper: {
    display: 'flex',
    alignItems: 'center',

    minHeight: Dimensions.get('window').height - 100,

    backgroundColor: '#000000',

    paddingBottom: 80,
    paddingLeft: 10,
    paddingRight: 10
  },

  trainingsWrapper: {
    width: '100%',
    minHeight: Dimensions.get('window').height - 220,

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
    marginBottom: 20,

    width: '100%'
  }
})

export default TrainingsPage