<template>
  <div class="city" v-height >
     <div class="right-nav">
        <ul>
          <li v-for="(item,index) of city" :key="item.title" @click="tocity(index)">{{item.title}}</li>
        </ul>
      </div>
    <div class="scroll-box"  v-height ref="wrapper">
      <div class="scroll-content">
      <div class="zuijin">
        <p>当前城市</p>
        <span>{{cityok1}}</span>
      </div>
      <div class="remen">
        <p>热门城市</p>
        <ul>
          <li v-for="(item,index) of hotcity" :key="index">
            <span @click="cityok(item)">{{item}}</span>
          </li>
        </ul>
      </div>
     
      <div class="city-list">
        <ul ref="aaa">
          <li v-for="(item) of city" :key="item.title" :class="item.title">
            <h3>{{item.title}}</h3>
            <p v-for="(itemlist) of item.lists" :key="itemlist" @click="cityok(itemlist)">{{itemlist}}</p>
          </li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {};
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      scrollY: true, // 滚动方向为Y轴
      click: true, // 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用event._constructed，若是bs派发的则为true
      momentum: true, // 当快速滑动时是否开启滑动惯性
      bounce: true, // 是否启用回弹动画效果
      bounceTime: 700, // 弹力动画持续的毫秒数
      deceleration: 0.001, // 滚动动量减速越大越快，建议不大于0.01
      momentumLimitTime: 300, // 符合惯性拖动的最大时间
      momentumLimitDistance: 15, // 符合惯性拖动的最小拖动距离
      resizePolling: 60
    });
  },
  computed: {
    hotcity() {
      return this.$store.state.cityList.hotcity;
    },
    city() {
      return this.$store.state.cityList.city;
    },
    cityok1(){

      return this.$store.state.cityok?this.$store.state.cityok:'北京'
    }
  },
  created() {
    this.$store.dispatch("GET");
  },
  methods: {
    tocity(index) {
     var h3= $( this.$refs.aaa).find('li').find('h3')
     var top=h3[index].offsetTop
     h3.parent().parent().parent().parent().parent().scrollTop(top)
    },
    cityok(item){
      this.$store.dispatch("CITYOK",{item})
      this.$router.go(-1)
    }
  }
};
</script>

<style>
.city{margin: 10px 10px;}
.city .scroll-box{
  overflow:auto;
  
}
.city .zuijin p {
  color: #ccc;
  padding: 8px 0;
}
.city .zuijin span {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 5px 25px;
  border-radius: 3px;
}
.city .remen {
  padding-right: 50px;
  padding-bottom:15px; 
  border-bottom:8px solid #eee; 
}
.city .remen p {
  color: #ccc;
  padding: 8px 0;

}
.city .remen ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
}
.city .remen li span {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 5px 25px;
  border-radius: 3px;
  margin: 5px 0;
}
.city .right-nav {
  position: absolute;
  right: 0;
  top: 150px;
  width: 20px;
  z-index: 99999;
}
.city .right-nav li {
  padding: 1px 0;
  list-style: none;
  font-size: 13px;
}
.city .city-list{padding-top:15px; }
.city .city-list h3,.city .city-list p{padding: 5px 0;}
.city .city-list h3{background: #eee;padding: 3px 0;}
.city .city-list p{border-bottom:0.5px solid #ccc; }
</style>