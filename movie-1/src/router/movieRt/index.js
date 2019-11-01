export default{
    path: '/movie',
    name: 'movie',
    meta:{
        name:"影院"
      },
    component: () => import('@/views/Movie')
}