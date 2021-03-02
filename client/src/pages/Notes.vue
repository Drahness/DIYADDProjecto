<template>
  <q-page class="flex flex-center">
    <q-card class="container">
      <q-list class="col-12" separator highlight sparse striped>
        <q-item clickable v-ripple v-for="nota in getNotes" :key="nota.id_assig">
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="book"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nota.cod_assig }}</q-item-label>
            <q-item-label caption lines="1">Nota: {{nota.nota}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Notes',
  components: {},
  data: () => {
    return {
      intervalid: ''
    }
  },
  created () {
    this.getNotesInterval()
  },
  computed: {
    getNotesSync () {
      return this.$store.getters['showcase/getLastSyncNotes']
    },
    getNotes () {
      return this.$store.getters['showcase/getNotes']
    }
  },
  methods: {
    getNotesInterval () {
      const store = this.$store
      store.dispatch('showcase/getNotesFromServer')
      this.intervalid = setInterval(function () {
        store.dispatch('showcase/getNotesFromServer')
      }, 30000)
    }
  }
}
</script>
