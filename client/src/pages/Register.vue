<template>
  <q-page class="$secondary window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-black q-my-md">Registre</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit" >
              <q-input square outlined clearable v-model="dni" type="dni" label="DNI"
              :rules="[val => new RegExp('[0-9]{8}[A-Z]').test(val) || 'DNI invalido' ]"/>
              <template>
                <q-icon name="account_circle" slot="prepend"></q-icon>
              </template>
              <q-input square outlined clearable v-model="username" type="username" label="Usuari"
              :rules="[val => val.lastIndexOf(' ') == -1 || 'Username no puede contener espacios.']"/>
              <q-input square outlined clearable v-model="password" float-label="Password" type="password" label="Contrasenya"
              :rules="[val => val.length > 8 || 'Contraseña muy corta']"/>
              <q-input square outlined clearable v-model="confirm" type="password" label="Confirma la contrasenya"
              :rules="[val => isPasswordAreEquals || 'Las contraseñas no coinciden.']"/>
              <q-input square outlined clearable v-model="full_name" type="full_name" label="Nom complet"
              :rules="[val => val.length > 2 && val.split(' ').length >= 2 && new RegExp('[A-Za-z ]*$').test(val)] "/>
              <q-card-actions class="q-px-md">
                <q-btn unelevated color="light-blue-7" type="submit" size="lg" class="full-width" label="Registre"/>
                                                                                                  <!-- This is put in methods, not computed-->
              </q-card-actions>
              </q-form>
          </q-card-section>
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
    onSubmit () {
      this.$store.dispatch('showcase/register', {
        dni: this.dni,
        full_name: this.full_name,
        username: this.username,
        password: this.password
      })
    }
  },
  computed: {
    isPasswordAreEquals () {
      return this.password === this.confirm
    },
    isLogged () {
      console.log(this.$store.getters['showcase/isLogged'], 'holaaa ')
      return this.$store.getters['showcase/isLogged']
    }
  }
}
</script>
