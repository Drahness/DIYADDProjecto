<template>
  <q-page class="flex flex-center">
    <q-list separator highlight sparse striped>
      <q-item clickable v-ripple v-for="asignatura in getAsignatures" :key="asignatura.id_assig">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="book"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ asignatura.nom_assig }}</q-item-label>
          <q-item-label caption lines="1">{{asignatura.cod_assig}}</q-item-label>
        </q-item-section>
           <q-item-section side top>
          <q-item-label caption>Horas: {{asignatura.hores}}</q-item-label>
          <!--<q-icon name="star" color="yellow" />-->
          </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Asignatures',
  computed: {
    getAsignSync () {
      return this.$store.getters['showcase/getLastSyncAsignatures']
    },
    getAsignatures () {
      console.log('comp getAsignatures')
      if (this.getAsignSync < Date.now() - 500000) {
        this.$store.dispatch('showcase/getAsignaturesFromServer')
      }
      return this.$store.getters['showcase/getAsignatures']
    }
  },
  methods: {
    mgetAsignatures () {

    }
  }
}
</script>
