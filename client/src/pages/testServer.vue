<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-black q-my-md">Server tester</h5>
      </div>
      <div class="row">
        <q-card square bordered class=" shadow-5 col-12">
          <q-card-section>
            <q-form class="q-gutter-md" @submit="onSubmit">
              <q-select :options="options"  v-model="option" label="Request type" :rules="[val => val != '' || 'Pon una opcion']"/>
              <div class="container">
                <div class="row">
                  <q-input class="col-12" v-model="ipaddress" label="Address" :rules="[val => val == val || 'something']"/>
                  <q-input class="col-10" v-model="query" label="Direction" :rules="[val => val.startsWith('/') || 'This not seems a valid route']"/>
                  <q-input class="col-2" v-model="port" label="Port" :rules="[val => val < 65535 || 'Max port reached']"/>
                </div>
                <div class="row">
                  <q-input class="col-6" v-if="hasBody" v-model="body" filled type="textarea" autogrow label="Body"/>
                  <q-input class="col-6" v-if="hasCustomConfig" v-model="config" filled type="textarea" autogrow label="Config"/>
                </div>
                <div class="row center">
                  <q-checkbox class="col-4" v-model="ssl" label="SSL" />
                  <q-checkbox class="col-4" v-model="hasCustomConfig" label="Custom Config" />
                  <q-card-actions class="q-px-md col-8">
                    <q-btn
                          unelevated
                          color="light-blue-7"
                          size="lg"
                          type="submit"
                          class="full-width"
                          label="Send"
                        />
                  </q-card-actions>
                </div>
              </div>
            </q-form>
            <pre>{{ response | pretty }}</pre>
          </q-card-section>
          <q-card-section class="text-center q-pa-none">

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'Testings',
  data () {
    return {
      options: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
      option: 'GET',
      ipaddress: 'localhost',
      port: 1234,
      response: '{}',
      body: '{}',
      query: '/',
      ssl: true,
      hasCustomConfig: false,
      config: '{ "headers": { "Authorization": "Bearer <<Token>>" } }'
    }
  },
  methods: {
    onSubmit () {
      let connectionString = ''
      let func
      if (this.ssl) {
        connectionString += 'https://'
      } else {
        connectionString += 'http://'
      }
      switch (this.option) {
        case 'GET':
          func = api.get
          break
        case 'POST':
          func = api.post
          break
        case 'PUT':
          func = api.put
          break
        case 'DELETE':
          func = api.delete
          break
        case 'HEAD':
          func = api.head
          break
        case 'OPTIONS':
          func = api.options
          break
        case 'PATCH':
          func = api.patch
          break
      }
      connectionString += this.ipaddress + ':' + this.port + this.query
      if (this.hasBody) {
        func(connectionString, JSON.parse(this.body), this.hasCustomConfig ? JSON.parse(this.config) : undefined)
          .then((result) => {
            console.log(result)
            this.response = result
          })
          .catch((error) => { this.response = error })
      } else {
        func(connectionString, this.hasCustomConfig ? JSON.parse(this.config) : undefined)
          .then((result) => {
            console.log(result)
            this.response = result
          })
          .catch((error) => { this.response = error })
      }
    }
  },
  computed: {
    hasBody () {
      return this.option !== 'GET'
    }
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2)
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
