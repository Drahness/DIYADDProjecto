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
              <q-input square outlined filled clearable v-model="dni" type="dni" label="DNI"
              :rules="[val => new RegExp('[0-9]{8}[A-Z]').test(val) || 'DNI invalido' ]"/>
              <template>
                <q-icon name="account_circle" slot="prepend"></q-icon>
              </template>
              <q-input square outlined filled clearable v-model="username" type="username" label="Usuari"
              :rules="[val => val.lastIndexOf(' ') == -1 || 'Username no puede contener espacios.']"></q-input>
              <q-input
                  square
                  outlined
                  filled
                  clearable
                  v-model="password"
                  float-label="Password"
                  :type="passwd_hide ? 'password' : 'text'" hint="Contrasenya"
                  label="Contrasenya"
                  :rules="[val => val.length > 8 || 'Contraseña muy corta']">
                <template v-slot:append>
                  <q-icon
                      :name="passwd_hide ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="passwd_hide = !passwd_hide"
                  />
                </template>
              </q-input>
              <q-input
                  v-model="confirm"
                  square
                  outlined
                  filled
                  clearable
                  :type="confirm_hide ? 'password' : 'text'" hint="Contrasenya"
                  :rules="[val => isPasswordAreEquals || 'Las contraseñas no coinciden.']"
                  label="Confirma la contrasenya">
                <template v-slot:append>
                  <q-icon
                      :name="confirm_hide ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="confirm_hide = !confirm_hide"
                  />
                </template>
              </q-input>

              <q-input
                  square
                  filled
                  outlined
                  clearable
                  v-model="full_name"
                  type="full_name"
                  label="Nom complet"
                  :rules="[val => val.length > 2 && val.split(' ').length >= 2 && new RegExp('[A-Za-z ]*$').test(val)] ">
              </q-input>
              <q-card-actions class="q-px-md">
                <q-btn
                    unelevated
                    glossy
                    color="primary"
                    type="submit"
                    size="lg"
                    class="full-width"
                    label="Registre"/>
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
  components: {},
  data () {
    return {
      dni: '',
      full_name: '',
      username: '',
      password: '',
      confirm: '',
      confirm_hide: true,
      passwd_hide: true
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
