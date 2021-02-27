import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'https://https://www.jgcamarena.site:8090/' })

Vue.prototype.$api = api
export { axios, api }
