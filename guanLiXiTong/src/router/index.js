import Vue from 'vue'
import VueRouter from 'vue-router'

// https://www.cnblogs.com/lxk0301/p/11671256.html
// 解决莫名其妙的报错 重写了一个push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
    {
        // path: '/list',
        // name: 'list',
        path: '/dianYing',
        name: 'dianYing',
        component: () => import('@/views/dianYing/index.vue')
    },
    {
        // path: '/uploader',
        // name: 'uploader',
        path: '/Yingyuan',
        name: 'Yingyuan',
        component: () => import('@/views/yingYuan/index.vue')
    },
    {
        path: '/uploader',
        name: 'uploader',
        component: () => import('@/views/uploader/index.vue')
    },
    {
        path: '/*',
        redirect: '/dianYing'
    }
]

const router = new VueRouter({
    routes
})

export default router
