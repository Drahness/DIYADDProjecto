<template>
  <q-page class="flex flex-center">
    <div class="col-2">
      <!-- <q-list bordered separator>
        <q-item clickable v-ripple v-for="(asignatura, index) in mgetAsignatures()" :key="asignatura.id_assig"> -->
          <!-- {{ asignatura.nom_assig }} {{ index }} -->
          <!-- <q-item-side>
            {{index}}
          </q-item-side>
          <q-item-main :label="asignatura.nom_assig"/>
        </q-item>
      </q-list> -->

    </div>
    <div>
      <q-list separator highlight>
        <div>
          <q-item clickable v-ripple></q-item>
            <q-item clickable v-ripple v-for="asignatura in getAsignatures" :key="asignatura.id_assig">
              <q-item-label>{{asignatura.nom_assig}}</q-item-label>
            </q-item>
        </div>
      </q-list>
    </div>
    <div>
      bbbb
    </div>
    <div>
      dddd
    </div>
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
