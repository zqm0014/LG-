export default{
    path: '/login',
    name: 'login',
    meta:{
        name:"登录"
      },
    component: () => import('@/views/Login')
}