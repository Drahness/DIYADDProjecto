import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'https://localhost:1234/' })
api.interceptors.request.use((request) => {
  const token = request.headers.authentication.split(" ")[1]
  if(this.$store.getters['showcase/tokenExp'] < (Date.now() / 1000) - 5) { // token expirado
    const refreshToken = this.$store.getters['showcase/getRefreshToken']
    api.post('/refresh',{token:refreshToken})
    .then((result) => {
      if(result.data.ok) {
        const newToken = result.data.data
        this.$store.commit("showcase/setToken",newToken)
      } else {
        console.log(result.data.data," error")
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

Vue.prototype.$api = api
export { axios, api }
