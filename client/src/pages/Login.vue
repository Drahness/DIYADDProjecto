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
                  (val) =>
                    (val.length != 0 && val.lastIndexOf(' ') == -1) ||
                    'Usuari no pot contindre espais.',
                ]"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Contrasenya"
                :rules="[(val) => val.length != 0 || 'Contrasenya buida.']"
              />
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-blue-7"
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
      password: ''
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
