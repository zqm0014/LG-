import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录注册
    msg: "",
    title: "",
    userinfo: null,
    addmsg: "",
    user: null,
    //电影详情
    moveXQ: [],
    movies: [],
    arr: [],
    cityList: {},
    cityok: "",
    sousuo: [],
    //影院store
    cinema: [],
    // buyCinema:[],
    buyCinemaMovie: {
      details: '',
      films: ''
    }
  },
  mutations: {
    //登录注册
    LOGIN(state, payload) {
      if (payload.token != undefined && payload.msg === "ok" && payload.title == "ok") {
        sessionStorage.token = payload.token;
        state.msg = payload.msg;
        state.title = payload.title
      } else if (payload.msg === "error" && payload.title == "密码错误") {
        state.title = payload.title
        state.msg = payload.msg;
      } else {
        state.title = payload.title
        state.msg = payload.msg;
      }
    },
    ISLOGIN(state, payload) {
      if (payload === undefined) {
        let userinfo = {
          imageUrl: "img/1.jpeg",
          username: ""
        }
        state.userinfo = userinfo;
      } else {
        state.userinfo = payload
      }
    },
    ADD(state, payload) {
      state.addmsg = payload
    },
    //
    GET(state, payload) {
      state.cityList = payload
    },
    CITYOK(state, payload) {
      // console.log(payload)
      state.cityok = payload.item
    },
    SOUSUO(state, payload) {
      if (payload.length > 0) {
        state.sousuo = payload

      } else {
        state.sousuo = "no"
      }
      // console.log(payload)
    },
    GETHOME(state, payload) {
      state.movies = payload
      state.arr = payload
    },
    //影院
    SHOW(state, payload) {
      state.cinema = payload
      // console.log(payload)
    },
    // buyCinema(state,payload){
    //   state.buyCinema=payload
    //   // console.log(payload)
    // },
    GETALL(state, payload) {
      state.moveXQ = payload
    },
    buyCinemaMovie(state, payload) {
      state.buyCinemaMovie = payload
    }


  },
  actions: {
    //登录注册
    async LOGIN({ commit }, payload) {
      let { token, msg, title } = await fetch("/login", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      commit("LOGIN", { token, msg, title })

    },
    async ISLOGIN({ commit }, payload) {
      let { userinfo } = await fetch("/islogin", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      commit("ISLOGIN", userinfo)
    },
    async ADD({ commit }, payload) {
      let { msg } = await fetch("/add", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      commit("ADD", msg)
    },
    //
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
      // console.log("999999999",obj)
    },
    async GETHOME({ commit }, payload) {
      var { movies } = await fetch('/getHome').then(res => res.json())
      commit('GETHOME', movies)
    },
    //影院
    async SHOW({ commit }) {
      var { cinema } = await fetch('/getCinema').then(res => res.json())
      // console.log(cinema)
      commit('SHOW', cinema)
    },
    //电影详情
    async GETALL({ commit }) {
      var { movieDetails } = await fetch('/getFilm').then(res => res.json())
      commit('GETALL', movieDetails)
    },
    async buyCinemaMovie({ commit }, payload) {
      // console.log("1234567",payload)
      var cinema = await fetch('/getCinemaMovie', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(res => res.json())
      // console.log("qwewqeqw",cinema)
      commit('buyCinemaMovie', cinema)
    }
  },
  modules: {
  }
})
