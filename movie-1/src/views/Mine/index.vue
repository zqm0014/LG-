<template>
  <div>
    <Header />
    <div class="tou">
      <p>
        <span class="iconfont icon-lingdang2f"></span>
      </p>
      <div class="container">
        <section class="left">
          <img src="img/1.jpeg" v-if="isimg" />
          <img :src="userimg.imageUrl" v-if="!isimg" />
          <span @click="login" v-if="isShow">立即登录</span>
          <span v-if="!isShow" @click="login">{{userinfo.username}}</span>
        </section>
        <section class="right">
          <span>个人主页&nbsp;></span>
        </section>
      </div>
      <ul class="nav">
        <li>轨迹</li>
        <li>电影</li>
        <li>剧集</li>
        <li>综艺</li>
        <li>书籍</li>
        <li>收藏</li>
      </ul>
      <div class="dingdan">
        <span class="bian">我的订单</span>
        <span class="dan">全部订单&nbsp;></span>
      </div>
    </div>
    <div class="zhong">
      <h3>我的服务</h3>
      <div class="fuwu">
        <img src="/img/03.png" alt />
        <img src="/img/04.png" alt />
        <img src="/img/05.png" alt />
        <img src="/img/06.png" alt />
        <img src="/img/07.png" alt />
        <img src="/img/09.png" alt />
        <img src="/img/10.png" alt />
        <img src="/img/11.png" alt />
        <img src="/img/12.png" alt />
        <img src="/img/13.png" alt />
      </div>
    </div>
    <div class="footer" v-height="500">
      <div class="setting">
        <p>
          <span>设置</span>
          <span>></span>
        </p>
        <p>
          @你 陈情令周边低至36元
          <span>></span>
        </p>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
export default {
  data() {
    return {
      isShow: true,
      isimg: true
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    userimg() {
      return this.$store.state.userinfo;
    }
  },
  watch: {
    userinfo(newVal, oldVal) {
      if (newVal.username == "") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    userimg(newVal, oldVal) {
      if (newVal.imageUrl) {
        this.isimg = false;
      } else {
        this.isimg = true;
      }
    }
  },
  created() {
    let token = sessionStorage.token;
    this.$store.dispatch("ISLOGIN", { token });
  },
  components: {
    Header,
    TabBar
  }
};
</script>

<style scoped lang="stylus" src="./mine.styl"></style>
