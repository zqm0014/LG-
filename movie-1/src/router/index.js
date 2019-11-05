import Vue from 'vue'
import VueRouter from 'vue-router'
import homeRouter from './homeRt'
import movieRouter from './movieRt'
import loginRouter from './loginRt'
import sousuoRouter from './sousuoRt'
import chengshiRouter from './chengshiRt'
import cinemaXQ from './cinemaXQ'
import buyTicke from './buyTicke'
import yyxq from './yingyuanXQ';

Vue.use(VueRouter)
// https://www.cnblogs.com/lxk0301/p/11671256.html
// 解决莫名其妙的报错 重写了一个push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const routes = [
    homeRouter,
    movieRouter,
    loginRouter,
    sousuoRouter,
    chengshiRouter,
    cinemaXQ,
    buyTicke,
    yyxq,
    {path: '/*', redirect: '/home/zzshangying'}

]

const router = new VueRouter({
    routes
})

export default router
