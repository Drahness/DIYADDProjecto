<template>
  <q-page
    class="$secondary window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-black q-my-md">Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-input
                square
                filled
                clearable
                v-model="username"
                type="username"
                label="Usuari"
                :rules="[
                  (val) => (val.length != 0 && val.lastIndexOf(' ') == -1) ||
                    'Usuari no pot contindre espais.',
                ]"
              >
              </q-input>

              <q-input
                  square
                  outlined
                  filled
                  clearable
                  v-model="password"
                  float-label="Password"
                  :type="passwd_hide ? 'password' : 'text'" hint="Contrasenya"
                  label="Contrasenya"
                  :rules="[val => val != null || 'Contraseña no puede estar vacia']">
                <template v-slot:append>
                  <q-icon
                      :name="passwd_hide ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="passwd_hide = !passwd_hide"
                  />
                </template>
              </q-input>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  glossy
                  color="primary"
                  size="lg"
                  type="submit"
                  class="full-width"
                  label="Login"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">No estas registrat?</p>
            <router-link to="register">Registra't</router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      passwd_hide: true
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('showcase/login', { username: this.username, password: this.password })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
