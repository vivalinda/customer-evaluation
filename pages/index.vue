<template>
  <v-layout
    class="blank"
    column
  >
    <v-flex>
      <v-container
        fluid
      >
        <v-layout
          v-if="evaluationDone"
          row
          wrap
        >
          <v-flex
            class="logo-vivalinda"
          >
            <img
              alt="Vivalinda"
              src="../static/logo.png">
          </v-flex>
          <v-flex
            style="text-align:center; margin-top:12%;"
          >
            <h1 class="evaluate-transition-title">
              Agradecemos sua Avaliação
            </h1>
            <v-progress-circular
              class="progress-circular-margin"
              indeterminate
              color="purple"
            />
            <h5>Carregando Nova Avaliação</h5>
          </v-flex>
        </v-layout>
        <v-layout
          v-else
          row
          wrap
        >
          <v-flex
            class="logo-vivalinda"
          >
            <img
              alt="Vivalinda"
              src="../static/logo.png">
          </v-flex>
          <v-flex
            style="text-align:center; margin:6%;"
          >
            <h1>
              Como foi o atendimento hoje?
            </h1>
          </v-flex>
          <v-flex class="btn-space">
            <v-btn
              class="btn-config"
              color="success"
              @click.stop="sendData(ratingOptions.good)"
            >
              {{ ratingOptions.good.grade }}
            </v-btn>
          </v-flex>
          <v-flex class="btn-space">
            <v-btn
              class="btn-config"
              color="warning"
              @click.stop="sendData(ratingOptions.normal)"
            >
              {{ ratingOptions.normal.grade }}
            </v-btn>
          </v-flex>
          <v-flex class="btn-space">
            <v-btn
              class="btn-config"
              color="error"
              @click.stop="sendData(ratingOptions.bad)"
            >
              {{ ratingOptions.bad.grade }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>"
    </v-flex>
  </v-layout>
</template>

<script>
//import { db, fireTime } from '../firebase'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      evaluationDone: false
    }
  },
  computed: {
    ...mapState(['ratingOptions'])
  },
  methods: {
    ...mapActions(['addToFirestore', 'getFromFirestore']),
    sendData(rate) {
      this.addToFirestore(rate)
      this.evaluationDone = true
      setTimeout(() => {
        this.evaluationDone = false
      }, 9000)
    }
  }
}
</script>


<style scoped lang="stylus">
  .blank
    display none

  @media only screen and (min-width: 740px) and (max-width: 800px)
    .blank
      display block

    .btn-space
      width 100%
      height 110px
      margin-bottom 10%
      margin-left 10%

    .btn-config
      width 86%
      height 100%
      font-size 65px

    .logo-vivalinda
      height 10%
      margin-left 30%

    img
      height 100%

    .evaluate-transition-title {
      margin-bottom: 5%;
    }

    .progress-circular-margin {
      margin-bottom: 2%;
    }

</style>
