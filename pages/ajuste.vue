<template>
  <v-container>
    <v-layout>
      <v-btn
        @click.prevent="resetDay()"
      >
        Ajuste
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { db, fireTime } from '../firebase/index.js'
import moment from 'moment'

export default {
  methods: {
    resetDay() {
      const selectedDate = new Date(moment().format())
      console.log('Data e Hora Atuais', selectedDate)
      const selectedDateMinusHour = new Date(
        moment(selectedDate)
          .add(-1, 'hours')
          .format()
      )
      console.log('Menos 1 hora', selectedDateMinusHour)
      const selectedDateMinusOne = new Date(
        moment(selectedDate)
          .add(-1, 'days')
          .format()
      )
      console.log('Menos 1 dia', selectedDateMinusOne)
      db.collection('avaliacao-vivalinda')
        .where('time', '>', selectedDateMinusOne)
        .where('time', '<', selectedDate)
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            console.log('Documento Excluido', doc.id)
            /*db.collection('avaliacao-vivalinda')  // comment to disable preventing unintentionally delete
              .doc(doc.id.toString())
              .delete()*/
          })
        })
    }
  }
}
</script>
