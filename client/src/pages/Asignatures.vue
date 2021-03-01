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
       <q-list highlight>
        <div >
          <q-item clickable v-ripple></q-item>
            <q-item clickable v-ripple v-for="asignatura in getAsignatures" :key="asignatura">
                <q-item-main>
                    <q-item-tile label>{{asignatura.nom_assig}}</q-item-tile>
                    <q-item-tile sublabel>R${{asignatura.id_assig}}</q-item-tile>
                </q-item-main>
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
    getAsignatures () {
      console.log('comp getAsignatures')
      const asig = this.$store.dispatch('showcase/getAsignatures')
      /* if (asig.lenght === 0) {
        asig = this.$store.getters('showcase/getAsignatures')
      } */
      return asig
    }
  },
  methods: {
    mgetAsignatures () {
      console.log('mgetAsignatures')
      const asig = this.$store.dispatch('showcase/getAsignatures')
      /* if (asig.lenght === 0) {
        asig = this.$store.getters('showcase/getAsignatures')
      } */
      return asig
    }
  }
}
</script>
