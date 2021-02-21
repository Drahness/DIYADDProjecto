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
          @click="leftDrawerOpen = !leftDrawerOpen"
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
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >

        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'

const linksData = [
  {
    title: 'Login',
    caption: '',
    icon: 'school',
    to: '/#/Login'
  },
  {
    title: 'About',
    caption: '',
    icon: 'favorite',
    to: '/i'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    // Dimecres, 16 de Febrer de 2021
    getDate () {
      const timeStamp = Date.now()
      let dateStr = date.formatDate(timeStamp, 'dddd, ') // dimecres
      dateStr += date.formatDate(timeStamp, 'D') // 16
      dateStr += ' de '
      dateStr += date.formatDate(timeStamp, 'MMMM') // Febrer
      dateStr += ' de '
      dateStr += date.formatDate(timeStamp, 'YYYY') // 2021
      return dateStr
    },

    getDateCat () {
      const timeStamp = new Date(Date.now())
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return timeStamp.toLocaleDateString('ca-ES', options)
    }
  }
}
</script>
