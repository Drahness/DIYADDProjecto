<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerState = !drawerState"
        />

        <q-toolbar-title>
          Qualificacions App
        </q-toolbar-title>
        <!-- Aqui abajo la data en valenciano
        // Dimecres, 16 de Febrer de 2021 -->
        <div>{{ getDateCat }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <div class="q-pa-md q-gutter-sm">
        <q-avatar class="rounded-borders" size="64px" >
          <q-icon name="account_circle" size="64px"/>
        </q-avatar>
      </div>
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
          <div v-if="!isLogged">
            <EssentialLink
              v-for="link in unloggedL"
              :key="link.title"
              v-bind="link"
            />
          </div>
          <div v-else>
            <EssentialLink
              v-for="link in loggedL"
              :key="link.title"
              v-bind="link"
            />
          </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const unLoggedLinks = [
  {
    title: 'Login',
    caption: '',
    icon: 'school',
    link: '#/login'
  },
  {
    title: 'Registre',
    caption: '',
    icon: 'school',
    link: '#/register'
  },
  {
    title: 'About',
    caption: '',
    icon: 'favorite',
    link: '#/about'
  }
]

const loggedLinks = [
  {
    title: 'About',
    caption: '',
    icon: 'favorite',
    link: '#/about'
  }
]
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLink: unLoggedLinks,
      unloggedL: unLoggedLinks,
      loggedL: loggedLinks
    }
  },
  computed: {
    // Dimecres, 16 de Febrer de 2021
    getDateCat () {
      const timeStamp = new Date(Date.now())
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return timeStamp.toLocaleDateString('ca-ES', options)
    },

    drawerState: {
      get () {
        return this.$store.state.showcase.drawerState
      },
      set (val) {
        this.$store.commit('showcase/updateDrawerState', val)
        this.leftDrawerOpen = val
      }
    },

    isLogged () {
      console.log('is loged', this.$store.getters['showcase/isLogged'])
      return this.$store.getters.isLogged
    }
  }
}
</script>
