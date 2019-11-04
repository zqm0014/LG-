import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //电影详情
    moveXQ:[],
    movies: [],
    arr: [],
    cityList: {},
    cityok: "",
    sousuo: [
 
  ],
  //影院store
  cinema:[],
  buyCinema:[]
},
  mutations: {

  GET(state, payload) {
    state.cityList = payload
  },
  CITYOK(state, payload) {
    console.log(payload)
    state.cityok = payload.item
  },
  SOUSUO(state, payload) {
    state.sousuo = payload
    console.log(payload)
  },
  GETHOME(state, payload) {
    state.movies = payload
    state.arr = payload
  },
  //影院
  SHOW(state,payload){
    state.cinema=payload
    // console.log(payload)
  },
  buyCinema(state,payload){
    state.buyCinema=payload
    // console.log(payload)
  },
  GETALL(state,payload){
    state.moveXQ = payload
  }


},
  actions: {
  async GET({ commit }) {
    var obj = await fetch("city.json").then(res => res.json())
    commit("GET", obj)
  },
  CITYOK({ commit }, payload) {
    var obj = payload
    commit("CITYOK", obj)
  },
  async SOUSUO({ commit }, payload) {
    var obj = await fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(res => res.json())
    commit("SOUSUO", obj)
    console.log(obj)


  },
    async GETHOME({ commit }, payload) {
      var { movies } = await fetch('/getHome').then(res => res.json())
      commit('GETHOME', movies)
    },
    //影院
    async SHOW({commit}){
      var {cinema}=await fetch('/getCinema').then(res=>res.json())
        // console.log(cinema)
        commit('SHOW',cinema)
      },
    //电影详情
    async GETALL({commit}){
      var {movieDetails} = await fetch('/getFilm').then(res =>res.json())
      commit('GETALL',movieDetails)
    },
     async buyCinema({commit}){
      var {cinema}=await fetch('/getCinema').then(res=>res.json())
        console.log(cinema)
        commit('buyCinema',cinema)
      }
    
},
  modules: {
}
})
