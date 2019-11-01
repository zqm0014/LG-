import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import directives from './plugins/directives.js';
import filters from './plugins/filters.js';
/*引入swiper*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
/*require styles*/
import 'swiper/dist/css/swiper.css'
/*引入vant*/
import 'vant/lib/index.css';
Vue.use(directives)
Vue.use(filters)
Vue.use(Vant);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
