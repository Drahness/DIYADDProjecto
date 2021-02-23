<template>
  <q-page class="$secondary window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-black q-my-md">Registre</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square outlined clearable v-model="dni" type="dni" label="DNI" />
              <template>
                <q-icon name="account_circle" slot="prepend"></q-icon>
              </template>
              <q-input square outlined clearable v-model="username" type="username" label="Usuari" />
              <q-input square outlined clearable v-model="password" float-label="Password" type="password" label="Contrasenya" />
              <q-input square outlined clearable v-model="confirm" type="password" label="Confirma la contrasenya" />
              <q-input square outlined clearable v-model="full_name" type="full_name" label="Nom complet" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Registre" @click="validate" />
                                                                                                <!-- This is put in methods, not computed-->
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <router-link to="login">Login</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      dni: '',
      full_name: '',
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    validate () {
      console.log(this)
      if (this.password === this.confirm) {
        return true
      }
      return false
    }
  }
}
</script>
