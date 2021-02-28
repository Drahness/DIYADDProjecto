<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary glossy text-white">
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
      v-on:hide="drawerState = false"
    >
    <!-- Si no tienes v-on:hide asi hay un bug que tienes que darle click dos veces para sacar el drawer-->

    <!--
      <q-banner class="bg-primary glossy text-white d-flex flex-row" v-if="isLogged">
        <template v-slot:avatar>
          <q-avatar class="rounded-borders " > size="64px"
            <q-icon name="account_circle" />
          </q-avatar >
        </template >
        <template v-slot:default>
            {{ username }}<br>
            <div style="color:white">{{ role }}</div>
          </template >
      </q-banner>
      <q-banner class="bg-primary glossy text-white" v-else>
      </q-banner>
    -->
    <Banner v-if="isLogged"
            :first_line="username"
            :second_line="role"
            :avatar="avatar"/>
    <q-banner class="bg-primary glossy text-white" v-else>

    </q-banner>
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
<!--          <div v-if="!isLogged">
            <EssentialLink
              v-for="link in getBookmarks"
              :key="link.title"
              v-bind="link"
            />
          </div>
          -->
          <div>
            <EssentialLink
              v-for="link in getBookmarks"
              :key="link.title"
              v-bind="link"
            />
          </div>
          <EssentialLink v-if="isLogged"
          v-bind="data_logout"
          v-on:click="logout()"
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
import Banner from 'components/Banner.vue'

const logout = {
  title: 'Logout',
  caption: '',
  icon: 'logout',
  link: ''
}

export default {
  name: 'MainLayout',
  components: { EssentialLink, Banner },
  data () {
    return {
      leftDrawerOpen: true,
      data_logout: logout
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
      return this.$store.getters['showcase/isLogged']
    },
    username () {
      return this.$store.getters['showcase/getUsername']
    },
    avatar () {
      return this.$store.getters['showcase/getAvatar']
    },
    role () {
      return this.$store.getters['showcase/getRole']
    },
    isProfe () {
      return this.$store.getters['showcase/isProfe']
    },
    isAlumne () {
      return this.$store.getters['showcase/isAlumne']
    },
    getBookmarks () {
      if (!this.isLogged) {
        return [
          {
            title: 'Login',
            caption: '',
            icon: 'login',
            link: '#/login'
          },
          {
            title: 'Registre',
            caption: '',
            icon: 'app_registration',
            link: '#/register'
          },
          {
            title: 'About',
            caption: '',
            icon: 'favorite',
            link: '#/about'
          }
        ]
      } else if (this.isProfe) {
        return [
          {
            title: 'Moduls',
            caption: '',
            icon: 'analytics',
            link: '#/moduls'
          }, {
            title: 'Alumnes',
            caption: '',
            icon: 'sentiment_satisfied_alt',
            link: '#/alumnes'
          }, {
            title: 'Asignatures',
            caption: '',
            icon: 'book',
            link: '#/asignatures'
          }, {
            title: 'About',
            caption: '',
            icon: 'favorite',
            link: '#/about'
          }
        ]
      } else if (this.isAlumne) {
        return [
          {
            title: 'Notes',
            caption: '',
            icon: 'speaker_notes',
            link: '#/notes'
          }, {
            title: 'Asignatures',
            caption: '',
            icon: 'book',
            link: '#/asignatures'
          }, {
            title: 'About',
            caption: '',
            icon: 'favorite',
            link: '#/about'
          }
        ]
      } else { // error
        console.log('error in bookmarks MainLoayout.vue')
        return []
      }
    }
  },
  methods: {
    logout (event) {
      console.log('logut')
      this.$store.dispatch('showcase/logout')
    }
  }
}
</script>
