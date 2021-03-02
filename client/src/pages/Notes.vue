<template>
  <q-page class="flex flex-center">
      <q-list separator highlight>
        <div>
          <q-item clickable v-ripple></q-item>
            <q-item clickable v-ripple v-for="nota in getNotes" :key="nota.id_assig">
              <q-item-label>{{nota.cod_assig}}: {{nota.nota}}</q-item-label>
            </q-item>
        </div>
      </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Notes',
  computed: {
    getNotesSync () {
      return this.$store.getters['showcase/getLastSyncNotes']
    },
    getNotes () {
      if (this.getNotesSync < Date.now() - 500000) {
        this.$store.dispatch('showcase/getNotesFromServer')
      }
      return this.$store.getters['showcase/getNotes']
    }
  }
}
</script>
