<template>
  <div id="nav">
    <div v-for="(item,index) of isclass" :key="index" :class="{'active':$route.meta.name==item.title}" @click="routergo(item.url)">{{item.title}}</div>
    <!-- <router-link tag="div" to="/home/zzshangying">首页</router-link> -->
    <!-- <router-link tag="div" to="/movie">影院</router-link> -->
    <!-- <router-link tag="div" to="/login">我的</router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclass: [
        {
          title: "首页",
          url: "/home",
        },
        {
          title: "影院",
          url: "/movie",
        },
        {
          title: "我的",
          url: "/mine",
        }
      ]
    };
  },
  methods: {
    routergo(url, index) {
      this.$router.push({ path: url });
    }
  }
};
</script>

<style scoped>
#nav {
  height: 50px;
  width: 100%;
  background: #eee;
  display: flex;
  position: fixed;
  bottom: 0;
}
#nav div {
  width: 33.333%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
#nav div.active {
  color: crimson;
}
</style>