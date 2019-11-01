<template>
  <div class="header">
    <span @click="routergo('/chengshi')" class="dingwei">
      <span>{{routertwo}}</span>
      <img src="img/bottom.png" />
    </span>
    <h3>LG电影</h3>
    <span @click="routergo('/sousuo')" class="search"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    routertwo() {
      return this.$store.state.cityok ? this.$store.state.cityok : "北京";
    }
  },
  methods: {
    routergo(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>

<style scoped lang="stylus">
.header {
  width: 100%;
  height: rem(50);
  background: crimson;
  text-align: center;
  line-height: rem(50);
  display: flex;
  justify-content: space-space-around;
  align-items: center;

  .search {
    width:61px;
    height: 50px;
    background: url('../../../public/img/search.png') 35px 15px no-repeat;
    border-radius: 50%;
    background-size: 20px 20px;
    margin-right: 10px;
  }

  h3 {
    flex: 2;
  }

  .dingwei {
    display: flex;
    align-items :center;
     margin-left : 10px;
    span {
        display inline-block
      height: 50px;
      width: 50px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #444;
    }
    img {
      width: 11px;
    }
  }
}
</style>