<template>
  <div class="content" v-height="135">
    <div class="swiper">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item, index) of swiperList" :key="index" style="touch-action: none;">
          <img :src="item.imgUrl" srcset alt />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="top">
      <div class="left">
        <img src="/img/logo.jpeg"/>
        <span>实时票房</span>
      </div>
      <div class="right">
        <p>
          今日大盘
          <span class="num">9754.4万</span>&gt;
        </p>
      </div>
    </div>
    <div class="movieDetails" v-height="325">
      <div class="bottom"
        v-for="(item, index) in movies"
        :key="index"
      >
        <div class="picture">
            <img src='/img/9.jpeg' alt />
            <img src="/img/bofang.png" />
        </div>
        <div class="message">
          <ul @click="information(item.title)">
            <li>
              <span 
                v-for="(child) in item.title" 
                :key="child"
              >{{child}}</span>
              <span 
                class="type" 
                v-for="(sunzi) in item.type" 
                :key="sunzi"
                :class="{imax : sunzi == 'IMAX'}"
                >
              
              {{sunzi}}</span>
            </li>
            <li>
              猫眼评分
              <span>{{item.score}}</span>
            </li>
            <li>
              主演 :
              <span>{{item.act}}</span> 
            </li>
            <li>
              今天<span>{{item.scenes[0]}}</span>家
              影院放映<span>{{item.scenes[1]}}</span>场
            </li>
          </ul>
          <p @click="buyTicke(item.title)">购票</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        {
          imgUrl: "/img/1.jpg"
        },
        {
          imgUrl: "/img/2.jpg"
        },
        {
          imgUrl: "/img/3.jpg"
        },
        {
          imgUrl: "/img/4.jpg"
        },
        {
          imgUrl: "/img/5.jpg"
        }
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: {
          delay: 1000
        }
      }
    };
  },
  created(){
      this.$store.dispatch('GETHOME')
  },
  computed : {
    movies(){
      return this.$store.state.movies
    }
  },
  methods: {
    buyTicke(title){
        this.$router.push({path :'/buyTicke',  query : {title}})
    },
    information(title){
      console.log(title)
      this.$router.push({path :'/information', query : {title}})
    }
  }
};
</script>

<style scoped lang = "stylus">
.content {
    overflow-y: hidden;
    .swiper {
        img {
            display: block;
            width: 100%;
            height: rem(160px);
        }
    }
    .top {
        width: 90%;
        margin: 0 auto;
        height: rem(30px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 rem(10px);
        margin-top: rem(10px);
        background: #f8f8f8;
        border-radius: rem(5px);
        .left, .right {
            display: flex;
            align-items: center;
            font-weight: 550;
            font-size: rem(12px);
            img {
                display: inline-block;
                width: 25px;
                height: 18px;
                padding: 0 5px;
            }
            .num {
                color: red;
                padding-right: rem(5px);
            }
        }
    }
    .movieDetails {
        width: 100%;
        overflow-y: scroll;
        margin: 0 auto;
    }
    .bottom {
        width: 90%;
        margin: rem(10px) auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1 2;
        .picture{
            width: 100%;
            height: rem(100px);
            display: flex;
            justify-content: space-between;
            flex: 1 3;
            position: relative;
            img:nth-child(1) {
                width: rem(65px);
                height: rem(85px);
                border-radius: rem(5px);
            };
            img:nth-child(2) {
                width: rem(30px);
                height: rem(30px);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }     
        }

        .message {
            width: calc(100% - 65px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: rem(10px);
            border-bottom: 1px solid #eee;
            height: rem(100px);
            p {
              width: 15%;
              border-radius: rem(50px) rem(50px) rem(50px) rem(50px);
              background: red;
              color: #fff;
              text-align: center;
              font-size: rem(12px);
              padding: rem(2px) 0;
            }
            ul {
              width : 80%;
              height: 100px;
              line-height: 1.6;
              li:nth-child(1) {
                display: flex;
                align-items: center;
                font-size: rem(14px);
                font-weight: bold;
                .type {
                  font-size: rem(8px);
                  background: #bbb5b5;
                  color: #fff;
                  margin-left: rem(5px);
                  padding: 0 rem(3px);
                  border-radius: rem(3px);
                  font-weight: normal;
                  &.imax{
                    background : #3fa1f4;
                  }
                }
              }

              li:nth-child(2) {
                font-size: rem(12px);

                span:nth-child(1) {
                  color: orange;
                  padding-left: rem(5px);
                }
              }

              li:nth-child(3), li:nth-child(4) {
                font-size: rem(12px);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
        }
    }
}
</style>