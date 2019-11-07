import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		movieDetails: [],
		cinema : [],
		loading: false,
	},
	mutations: {
		GETFILM(state, payload) {
			state.movieDetails = payload.movieDetails
		},
		GETCINEMA(state, payload) {
			state.cinema = payload
		},
		ADDFILM(state, payload){
			state.movieDetails = payload.movieDetails
		},
		DEL(state, payload){
			state.movieDetails = payload.movieDetails
		},
		ISLOADING(state, payload) {
			state.loading = payload
		}
	},
	actions: {
		// 获取电影
		async GETFILM({ commit }) {
			var data = await fetch('/getFilm').then(res => res.json())
			// console.log(data);
			commit('GETFILM', data)
			commit('ISLOADING', false)
		},
		// 获取影院
		async GETCINEMA({ commit }) {
			var data = await fetch('/getCinema').then(res => res.json())
			// console.log(data);
			commit('GETCINEMA', data)
			commit('ISLOADING', false)
		},
		// 上传信息
		async ADDFILM({ commit }, payload) {
			console.log("ADDFILM: ", payload);
			var data = await fetch('/addFilm', {
				method: "POST",
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(payload)
			}).then(res => res.json());
			// console.log("ADDFILM: ", data);
			commit("ADDFILM", data);
			setTimeout(() => {
				payload.cb()
			}, 800)
		},
		//删除
		async DEL({ commit }, payload) {
			var data = await fetch('/del', {
				method: "POST",
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(payload)
			}).then(res => res.json());
			console.log("DEL: ", data);
			commit("DEL", data);

			commit('ISLOADING', false)
		}
	}
})
