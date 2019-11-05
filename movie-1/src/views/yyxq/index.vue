<template>
    <div class="big" >
      <!-- <h2>{{imglist}}</h2> -->
        <div class="header">
            <img src="/img/back.png" alt />
            <span>{{this.$router.history.current.query.title}}</span>
            <img src="/img/logo.jpeg" alt />
            <img src="/img/search.png" alt />
        </div>
        <div class="main" v-height="100">
            <div class="address">
                <div class="left">
                    <div class="luxian">
                        <h4>{{this.$router.history.current.query.title}}</h4>
                        <p>{{movieJS.address}}</p>
                    </div>
                    <img src="/img/logo.jpeg" alt />
                </div>
                <div class="right">
                    <img src="/img/search.png" alt />
                </div>
            </div>
            <div class="detail">
                <div class="taocan">
                    <div class="first">
                        <h4>观影套餐</h4>
                        <p>小吃、周边35.2元起</p>
                    </div>
                    <img src="/img/search.png" alt />
                </div>
                <div class="zhekou">
                    <div class="second">
                        <h4>折扣卡</h4>
                        <p>开卡首单2张立减4元</p>
                    </div>
                    <img src="/img/search.png" alt />
                </div>
            </div>
            <div class="tab" >
            <div class="picture" >
                <img @click="xuanMovie(index)" v-for="(item,index) of movieJS.details.films" :key="item.time" :src="item.img" alt />              
            </div>
            
            <div v-show="movieindex==index" class="box" v-for="(item,index) of movieJS.details.films" :key="item.time">
                <div class="jieshao">
                    <h4>
                        {{item.name}}
                        <span>{{item.score}}</span>
                        <span>分</span>
                    </h4>
                    <p>
                        <span>{{item.zhuyan}}</span>        
                    </p>
                </div>
                <div class="content">
                    <div class="timer" >
                        <span @click="xuanDay(index2)" v-for="(item2,index2) in item.scenes" :key="index2">{{item2.time}}</span>
                    </div>
                    <div class="zkjieshao">
                        <p class="zk">
                            <span>折扣卡</span>
                            <span>现在开单，首单2张最高立减4元</span>
                        </p>
                        <p class="kk">
                            15元起开卡
                            <span>&gt;</span>
                        </p>
                    </div>
                
                    <div  v-show="dayindex==index3" class="xq" v-for="(item3,index3) in item.scenes" :key="index3">
                        <ul>
                            <li v-for="(item4,index4) of item3.times" :key="index4">
                                <div class="zuo">
                                    <p>
                                        <span class="time1">{{item4.kaichang}}</span>
                                        <span>{{item4.sanchang}}</span>
                                    </p>
                                    <p>
                                        <span class="time2">{{item4.yuyan}}</span>
                                        <span>{{item4.ting}}</span>
                                    </p>
                                </div>
                                <div class="you">
                                    <div>
                                        <p>
                                            <span>{{item4.money}}</span>
                                        </p>
                                        <p>
                                            <span>折扣卡首单</span>
                                            <span>33元</span>
                                        </p>
                                    </div>
                                    <p class="ticket" @click="goupiao(item4.kaichang,item4.yuyan)">购票</p>
                                </div>
                            </li>                           
                        </ul>
                    </div>

                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
      dayindex:0,
      movieindex:0,
     
    }
  },
  mounted(){
 
    this.$store.dispatch('buyCinemaMovie',this.$router.history.current.query)
  },
  computed:{
    movieJS(){
          console.log(this.$store.state.buyCinemaMovie)
          return this.$store.state.buyCinemaMovie
       
    }
  },
  methods:{
    xuanMovie(index){
      this.movieindex=index
    },
    xuanDay(index){
        console.log(123456)
        this.dayindex=index
    },
    goupiao(){
      this.$router.push({path:"/xuanzuo"})
    }
  },
};
</script>

<style scoped lang = "stylus">
.big {
    overflow : hidden;
}
.header {
  width: 100%;
  height: rem(50);
  line-height: rem(50);
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: crimson;
  color: #fff;

  img:nth-child(1) {
    width: rem(30px);
    height: rem(30px);
  }

  img:nth-child(2) {
    width: rem(20px);
    height: rem(20px);
  }

  img:nth-child(3) {
    width: rem(20px);
    height: rem(20px);
  }

  span {
    width: rem(180px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.main{
overflow :scroll;

.address {
  width: 90%;
  height: rem(60);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: rem(12);
      padding-top: rem(5);
      color: #969799;
    }

    img {
      width: rem(20);
      width: rem(20);
    }
  }

  .right {
    width: 10%;
    border-left: 1px solid #969799;
    margin: rem(20) 0;

    img {
      width: 90%;
      padding-left: rem(10);
    }
  }
}

.detail {
  width: 90%;
  height: rem(50);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .taocan, .zhekou {
    width: 48%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: rem(5);
    background: #fbefef;
    padding: rem(5) 0;

    img {
      width: rem(25);
      width: rem(25);
    }

    .first h4 {
      color: orangered;
    }

    .first p {
      font-size: rem(12);
      padding-top: rem(5);
      color: orangered;
    }

    .second h4 {
      color: #fdc211;
    }

    .second p {
      font-size: rem(12);
      padding-top: rem(5);
      color: #fdc211;
    }
  }
}

.picture {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #282828;
  padding: rem(20) 0;
  margin: rem(15) 0;

  img {
    width: 20%;
    height: rem(100);
  }
}

.jieshao {
  width: 100%;
  height: rem(50);
  text-align: center;
  border-bottom: 1px solid #c7c6c6;

  h4 span:nth-child(1) {
    color: #fdc211;
    font-weight: normal;
  }

  h4 span:nth-child(2) {
    font-weight: normal;
    font-size: rem(10);
    color: #fdc211;
  }

  p span:nth-child(3) {
    font-size: rem(12);
    color: #969799;
    padding: 0 rem(5);
  }

  p span:nth-child(1), p span:nth-child(2) {
    font-size: rem(12);
    color: #969799;
    padding: 0 rem(5);
    border-right: 1px solid #969799;
  }
}

.content {
  .timer {
    width: 100%;
    height: rem(40);
    line-height: rem(40);
  }

  .zkjieshao {
    display: flex;
    height: rem(40);
    line-height: rem(40);
    justify-content: space-around;
    align-items: center;
    background: #fbefef;
    font-size: rem(13);
    border: 1px solid #c7c6c6;

    .zk {
      span:nth-child(1) {
        background: orange;
        color: #fff;
        border-radius: rem(3);
        padding: 0 rem(5);
      }

      span:nth-child(2) {
        color: orange;
        border-radius: rem(3);
        padding: 0 rem(5);
      }
    }

    .kk {
      color: #848181;

      span {
        font-size: rem(20px);
      }
    }
  }

  .xq {
    ul {
      li {
        height: rem(80);
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #848181;
        .zuo {
          width: 48%;
          height: rem(80);
          display: flex;
          justify-content: space-around;
          align-items: center;
          p {
            span {
              display: block;
              color: #848181;
              font-size: rem(12);
              line-height: 2.5;
            }
            .time1 {
              font-size: rem(16);
              color: black;
              line-height: 2;
            }
            .time2 {
              font-size: rem(12);
              color: black;
            }
          }
        }
        .you {
          width: 48%;
          height: rem(80);
          display: flex;
          justify-content: space-around;
          align-items: center;
          div {
            p {
              text-align: right;
            }
            p:nth-child(1) {
              span {
                font-size: rem(12);
                color: red;
                line-height: 2.5;
              }
            }
            p:nth-child(2) {
              display: flex;
              align-items: center;
              height: rem(20);
              line-height: rem(20);
              border: 1px solid orange;
              font-size: rem(10);
              border-radius: rem(5);
              span:nth-child(1) {
                display: inline-block;
                height: rem(20);
                line-height: rem(20);
                padding: rem(0) rem(5);
                border-top-left-radius: rem(5);
                border-bottom-left-radius: rem(5);
                background: orange;
                color: #fff;
              }
              span:nth-child(2) {
                color: orange;
                padding: rem(0) rem(5);
              }
            }
          }
          .ticket {
            border: 1px solid red;
            color: red;
            border-radius: rem(50);
            font-size: rem(12);
            padding: 0 rem(5);
          }
        }
      }
    }
  }
  }
}
</style>