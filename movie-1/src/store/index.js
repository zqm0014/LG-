import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    arr: [],
    cityList: {},
    cityok: "",
    sousuo: [
      // {
      // "title": "唐人街探案2",
      // "tag": "喜剧 / 动作 / 犯罪",
      // "act": "陈思诚 王宝强 刘昊然 肖央 刘承羽 ",
      // "year": "2018-02-16 大陆上映/121分钟",
      // "dir": "陈思诚",
      // "desc": "唐仁（王宝强 饰）为巨额奖金欺骗秦风（刘昊然 饰）到纽约参加世界名侦探大赛，然而随着和世界各国侦探们啼笑皆非的较量，两人却发现了隐藏在这次挑战背后的更大秘密...",
      // "cover": "./1.jpg",
      // "act_s": [
      //   {
      //     "name": "陈思诚",
      //     "shi": null,
      //     "image": "/moviePictures/tangrenjietanan1.png"
      //   },
      //   {
      //     "name": "王宝强",
      //     "shi": "唐仁",
      //     "image": "/moviePictures/tangrenjietanan2.png"
      //   },
      //   {
      //     "name": "刘昊然",
      //     "shi": "秦风",
      //     "image": "/moviePictures/tangrenjietanan3.png"
      //   },
      //   {
      //     "name": "肖央",
      //     "shi": "宋义",
      //     "image": "/moviePictures/tangrenjietanan4.png"
      //   },
      //   {
      //     "name": "刘承羽",
      //     "shi": "陈英",
      //     "image": "/moviePictures/tangrenjietanan5.png"
      //   }
      // ],
      // "comment": [
      //   {
      //     "name": "千亿有理",
      //     "txt": "周冬雨不会适应后，校色抱我游刃有余，儿一样钱徐泽给我很大的惊喜，他不是我印象中德国盖头男孩了，眼神很有内容。影片很棒，主题很好。",
      //     "image": "/moviePictures/tangrenjietanan1.png",
      //     "zan": 100
      //   },
      //   {
      //     "name": "浅笑安然",
      //     "txt": "电影太精彩了，我都要哭死了。。。。",
      //     "image": "/moviePictures/tangrenjietanan3.png",
      //     "zan": 100
      //   },
      //   {
      //     "name": "明明这就是爱",
      //     "txt": "都给我看！！！！！俩主演是要我明码！！！希望校园欺凌领不要再发生了",
      //     "image": "/moviePictures/tangrenjietanan5.png",
      //     "zan": 100
      //   }
      // ]
      // },
      // {
      //   "title": "唐人街探案2",
      //   "tag": "喜剧 / 动作 / 犯罪",
      //   "act": "陈思诚 王宝强 刘昊然 肖央 刘承羽 ",
      //   "year": "2018-02-16 大陆上映/121分钟",
      //   "dir": "陈思诚",
      //   "desc": "唐仁（王宝强 饰）为巨额奖金欺骗秦风（刘昊然 饰）到纽约参加世界名侦探大赛，然而随着和世界各国侦探们啼笑皆非的较量，两人却发现了隐藏在这次挑战背后的更大秘密...",
      //   "cover": "/moviePictures/tangrenjietanan.png",
      //   "act_s": [
      //     {
      //       "name": "陈思诚",
      //       "shi": null,
      //       "image": "/moviePictures/tangrenjietanan1.png"
      //     },
      //     {
      //       "name": "王宝强",
      //       "shi": "唐仁",
      //       "image": "/moviePictures/tangrenjietanan2.png"
      //     },
      //     {
      //       "name": "刘昊然",
      //       "shi": "秦风",
      //       "image": "/moviePictures/tangrenjietanan3.png"
      //     },
      //     {
      //       "name": "肖央",
      //       "shi": "宋义",
      //       "image": "/moviePictures/tangrenjietanan4.png"
      //     },
      //     {
      //       "name": "刘承羽",
      //       "shi": "陈英",
      //       "image": "/moviePictures/tangrenjietanan5.png"
      //     }
      //   ],
      //   "comment": [
      //     {
      //       "name": "千亿有理",
      //       "txt": "周冬雨不会适应后，校色抱我游刃有余，儿一样钱徐泽给我很大的惊喜，他不是我印象中德国盖头男孩了，眼神很有内容。影片很棒，主题很好。",
      //       "image": "/moviePictures/tangrenjietanan1.png",
      //       "zan": 100
      //     },
      //     {
      //       "name": "浅笑安然",
      //       "txt": "电影太精彩了，我都要哭死了。。。。",
      //       "image": "/moviePictures/tangrenjietanan3.png",
      //       "zan": 100
      //     },
      //     {
      //       "name": "明明这就是爱",
      //       "txt": "都给我看！！！！！俩主演是要我明码！！！希望校园欺凌领不要再发生了",
      //       "image": "/moviePictures/tangrenjietanan5.png",
      //       "zan": 100
      //     }
      //   ]
      //   }
 
  ]
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
    }
},
  modules: {
}
})
