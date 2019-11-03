<template>
  <div class="box">
    <Header />
  
    <swiper :options="swiperOption">
      <swiper-slide class="pic" v-for="(item,index) in picList" :key="index">
        <div>
          <img :src="item.pic" alt />
        </div>
        <!-- {{item.pic}} -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <router-view :show="show"></router-view> -->
    <div class="cinema">
      <ul>
        <li v-for="(item,index) of show"
         @click="XQ(item.title)" 
         :key="index">
         <router-view></router-view>
          <p class="content-title">
            <span>{{item.title}}</span>
            <span>{{item.price}}</span>
          </p>
          <p class="content-address">
            <span>{{item.address}}</span>
          </p>
          <p class="content-keyword">
            <span v-for="(items,indexs) of item.Keyword" :key="indexs">{{items}}</span>
          </p>
          <p class="content-ka">
            <span>
              <b>卡</b>
              {{item.ka}}
            </span>
          </p>
        </li>
      </ul>
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
      picList: [
        {
          pic: "/img/1.jpg"
        },
        {
          pic: "/img/2.jpg"
        },
        {
          pic: "/img/3.jpg"
        },
        {
          pic: "/img/4.jpg"
        }
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true
      }
    };
  },
  //数据
  computed: {
    show() {
      // console.log(this.$store.state.cinema)
      return this.$store.state.cinema;
    }
  },
  methods: {
    XQ(title) {
      this.$router.push({path:'/cinemaXQ'})
    }
  },
  components: {
    Header,
    TabBar
  },
  created() {
    this.$store.dispatch("SHOW");
  }
};
</script>

<style scoped lang="stylus">


.pic img {
  width: 100%;
  display: block;
  height: 150px;
}

.content ul {
  list-style: none;
  text-align: center;
  width: 100%;
  line-height: 40px;
  display: flex;
  height: 40px;
  font-size: 12px;
  color: #e3e3e3;
}

ul>li {
  color: #000;
  width: 25%;
  font-size: 14px;
  color: #999977;
  border-bottom: solid 1px #e3e3e3;
}

.cinema {
  width: 100%;
  box-sizing: border-box;

  ul {
    li {
      padding: 15px 5px;
      width: 100%;
      line-height: 20px;
      border-bottom: solid 1px #e3e3e3;

      .content-title {
        font-size: 16px;
        color: #000;
        font-weight: 600;

        span:last-child {
          float: right;
          margin-right: 10px;
          color: red;
          font-size: 14px;
        }
      }

      .content-address {
        color: #333;
        font-size: 12px;
      }

      .content-keyword {
        span {
          margin: 0 5px;
          font-size: 10px;
          border: solid 1px yellowgreen;
        }
      }

      .content-ka {
        font-size: 10px;

        b {
          padding: 2px;
          background: purple;
          color: #fff;
        }
      }
    }
  }
}
</style>
