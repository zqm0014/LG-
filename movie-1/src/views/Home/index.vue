<template>
  <div>
    <Header />
    <div class="main" v-height='100'>
        <ul class="main-nav">
          <li v-for="(item,index) of homenav" :key="index" @click="routergo(item.url)" :class="{'active':$route.meta.name1==item.title}">{{item.title}}</li>
        </ul>
        <router-view/> 
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  data(){
    return{
      homenav:[
        {
          title:'正在热映',
          url:"/home/zzshangying"
        },{
          title:'即将上映',
          url:"/home/jjshangying"
        }
      ]
    }
  },
  computed:{
 
  },
  methods:{
    routergo(url){
      this.$router.push({path:url})
      console.log(this.$router.options.routes[0].redirect=url)
    }
  },
  components: {
    Header,
    TabBar
  }
};
</script>

<style scoped>
  .main .main-nav{display: flex;width: 100%;list-style: none;justify-content: center;}
  .main .main-nav li{width: 25%;height: 35px;line-height: 35px;text-align: center;}
   .main .main-nav li.active{border-bottom:2px solid crimson;box-sizing: border-box;}
</style>
