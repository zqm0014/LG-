export default {

    path: '/home',
    name: 'home',
    meta: {
        name: "首页"
    },
    redirect:'/home/zzshangying',
    component: () => import('@/views/Home'),
    children: [ {
        path: "jjshangying",
        meta: {
            name1: "即将上映",
            name:'首页'
        },
        component: () => import('@/components/Jjshangying')
    }, {
        path: "zzshangying",
        meta: {
            name1: "正在热映",
            name:'首页'
        },
        component: () => import('@/components/Zzshangying')
    }
],
}