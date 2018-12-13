import Vuex from 'vuex'
import { db, fireTime } from '../firebase/index.js'
import moment from 'moment'

const createStore = () => {
  // const date = new Date()
  //.toISOString(true)
  //.substr(0, 10)
  return new Vuex.Store({
    state: () => ({
      fireTime: fireTime,
      searchDate: new Date().toISOString().substr(0, 10),
      rate: 0,
      ratingOptions: {
        good: { grade: '😍 😍 😍', points: 3, time: null },
        normal: { grade: '😀 😀 😀', points: 1, time: null },
        bad: { grade: '🙁 🙁 🙁', points: -3, time: null }
      },
      ratingSum: 0,
      allRatingData: {}
    }),
    /* ........state End
                                         getters start               */
    getters: {
      numberOfRates(state) {
        return state.allRatingData.length
      }
    },
    /* ........getters End
     ...... mutations Starts                                         */
    mutations: {
      setSearchDate(state, payload) {
        state.searchDate = payload
      },
      setAllRatingData(state, payload) {
        state.allRatingData = payload
      },
      setRatingSum(state, payload) {
        state.ratingSum = payload
        state.rate = ((payload / state.allRatingData.length / 3) * 5).toFixed(2)
      }
    },
    /* ........mutations End

     ...... actions Starts                                           */
    actions: {
      commitDate({ commit }, payload) {
        commit('setSearchDate', payload)
      },
      addToFirestore({ commit }, rating) {
        rating.time = fireTime
        db.collection('avaliacao-vivalinda')
          .add(rating)
          .catch(err => console.log('Error adding document', err))
      },
      getFromFirestore({ commit }, picker) {
        const selectedDate = new Date(moment(picker).format())
        const selectedDatePlusOne = new Date(
          moment(selectedDate)
            .add(1, 'days')
            .format()
        )
        console.log('now', selectedDatePlusOne)
        db.collection('avaliacao-vivalinda')
          .where('time', '<', selectedDatePlusOne)
          .where('time', '>', selectedDate)
          .get()
          .then(snapshot => {
            commit(
              'setAllRatingData',
              snapshot.docs.map(doc => {
                let date = new Date(doc.data().time.seconds * 1000)
                return date
              })
            )
            commit(
              'setRatingSum',
              snapshot.docs.reduce((sum, rating) => {
                return sum + rating.data().points
              }, 0)
            )
          })
      }
    }
    /* ........actions End
                                                                     */
  }) // close return new Vuex.Store({
} // close const createStore = () => {

export default createStore

/*


way to split files ->



import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    //user: user,
    //shared: shared,
    rating: rating
  }
})
*/
