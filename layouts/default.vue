<template>
  <v-app
    class="font-default"
  >
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="purple lighten-5"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title"/>
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { icon: 'record_voice_over', title: 'Avalie', to: '/' },
        { icon: 'stars', title: 'Resultado', to: '/resultado' }
      ],
      title: 'Avaliação Vivalinda'
    }
  }
}
</script>

<style lang="stylus">

  .font-default
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale

</style>
