<template>
  <v-container
    fill-height
  >
    <v-layout
      row
      wrap
      align-center
    >
      <v-flex
        class="text-xs-center datePicker"
      >
        <v-date-picker
          :width="dateWidth"
          v-model="picker"
          color="purple lighten-2"
          locale="pt-br"
          first-day-of-week="3"
          reactive
        />
      </v-flex>
      <v-flex
        class="text-xs-center"
      >
        <v-btn
          large
          @click.prevent="showResult(picker)"
        >
          Resultado do Dia
        </v-btn>
      </v-flex>
      <v-flex
        v-if="resultClicked === true"
        class="text-xs-center star"
      >
        <no-ssr>
          <star-rating
            :rating="rate"
            :increment="increment"
            :show-rating="showRating"
            :star-size="starSize"
            round-start-rating
            read-only
          />
        </no-ssr>
      </v-flex>
      <v-flex
        v-show="resultClicked === true"
        class="text-xs-center starText"
      >
        <div>
          <h2> Pontuação do dia {{ date }}</h2>
          <h1> {{ rate }}</h1>
        </div>
        <div>
          <h2>Número de Avaliações</h2>
          <h1>{{ numberOfRates }}</h1>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import StarRating from 'vue-star-rating'
import moment from 'moment'
export default {
  components: {
    StarRating
  },
  data() {
    return {
      picker: this.$store.state.searchDate,
      time: this.$store.state.fireTime,
      increment: 0.01,
      showRating: false,
      starSize: 80,
      dateWidth: 340,
      resultClicked: false,
      date: ''
    }
  },
  computed: {
    ...mapState(['rate']),
    ...mapGetters(['numberOfRates'])
  },
  methods: {
    ...mapActions(['getFromFirestore']),
    showResult(picker) {
      this.getFromFirestore(picker)
      this.resultClicked = true
      this.selectedDay()
    },
    selectedDay() {
      let day = moment(this.picker).format('DD/MM/YYYY')
      this.date = day
    }
  }
}
</script>

<style lang="stylus" scoped>
  .datePicker
    width 100%
    margin-bottom 3%
    margin-top 9%
  .star
    width 100%
    margin-top 7%
    margin-left 15%
  .starText
    width 100%
    margin-top 2%
  h2
    margin-bottom: 1%
    margin-top: 1%
</style>
