<template>
  <div class="big">
    <div class="header">
      <span class="iconfont icon-tubiao-1" @click="routeback()"></span>
      <span class="two">{{this.$router.history.current.query.title}}</span>
      <span class="iconfont icon-danyehuaban"></span>
      <span class="iconfont icon-tubiao-3"></span>
    </div>
    <div class="main" v-height="100">
      <div class="address">
        <div class="left">
          <div class="luxian">
            <h4>{{this.$router.history.current.query.title}}</h4>
            <p>{{movieJS.address}}</p>
          </div>
          <span class="iconfont icon-tubiao-"></span>
        </div>
        <div class="right">
          <span class="iconfont icon-dingwei1"></span>
        </div>
      </div>
      <div class="detail">
        <div class="taocan">
          <div class="first">
            <h4>观影套餐</h4>
            <p>小吃、周边35.2元起</p>
          </div>
          <span class="iconfont icon-ziyuan"></span>
        </div>
        <div class="zhekou">
          <div class="second">
            <h4>折扣卡</h4>
            <p>开卡首单2张立减4元</p>
          </div>
          <span class="iconfont icon-VIP"></span>
        </div>
      </div>
      <div class="tab">
        <div class="picture">
          <img
            @click="xuanMovie(index)"
            v-for="(item,index) of movieJS.details.films"
            :key="item.time"
            :src="item.img"
            alt
          />
        </div>

        <div
          v-show="movieindex==index"
          class="box"
          v-for="(item,index) of movieJS.details.films"
          :key="item.time"
        >
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
            <div class="timer">
              <span
                :class="{'cur ': isClick[0] ? 'cur' : '' }"
                @click="xuanDay(0)"
              >{{ GetDateStr(0) }}</span>
              <span
                :class="{'cur ': isClick[1] ? 'cur' : ''}"
                @click="xuanDay(1)"
              >{{ GetDateStr(1) }}</span>
              <span
                :class="{'cur ': isClick[2] ? 'cur' : ''}"
                @click="xuanDay(2)"
              >{{ GetDateStr(2) }}</span>
              <span
                :class="{'cur ': isClick[3] ? 'cur' : ''}"
                @click="xuanDay(3)"
              >{{ GetDateStr(3) }}</span>
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

            <div
              v-show="dayindex==index3"
              class="xq"
              v-for="(item3,index3) in item.scenes"
              :key="index3"
            >
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
                    <p class="ticket" @click="buy">购票</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar";
export default {
  data() {
    return {
      dayindex: 0,
      movieindex: 0,
      dateTime: new Date().getTime(),
      currentMonth: new Date().getMonth() + 1,
      isClick: [true, false, false, false]
    };
  },
  mounted() {
    this.$store.dispatch("buyCinemaMovie", this.$router.history.current.query);
  },
  components: {
    TabBar
  },
  computed: {
    movieJS() {
      return this.$store.state.buyCinemaMovie;
    },
    routeback() {
      this.$router.go(-1);
    }
  },
  methods: {
    xuanMovie(index) {
      this.movieindex = index;
    },
    xuanDay(index) {
      this.dayindex = index;
      for (var a = 0; a < this.isClick.length; a++) {
        if (index == a) {
          this.isClick[a] = !this.isClick[a];
        } else {
          this.isClick[a] = false;
        }
      }
    },
    buy() {
      this.$router.push({ path: "/xuanzuo" });
    },

    //电影时间显示
    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var m = dd.getMonth() + 1; //获取当前月份
      var d = dd.getDate(); //获取当前月份的日期
      var w = dd.getDay(); //获取当前星期X(0-6,0代表星期天
      return (
        m + "月" + d + "日" + (w ? "周" + "日一二三四五六".charAt(w) : "周日")
      );
    }
  }
};
</script>

<style scoped lang = "stylus">
.big {
  overflow: hidden;
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

  span:not(.two) {
    font-size: rem(20);
  }

  .two {
    display: inline-block;
    width: rem(180px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.main {
  overflow: scroll;

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

      span {
        font-size: rem(12);
      }

      p {
        font-size: rem(12);
        padding-top: rem(5);
        color: #969799;
      }
    }

    .right {
      width: 10%;
      border-left: 1px solid #969799;
      margin: rem(20) 0;

      span {
        font-size: rem(20);
        padding-left: rem(10);
        color: #3dbcf6;
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

    .taocan span {
      font-size: rem(30);
      color: orangered;
    }

    .zhekou span {
      font-size: rem(35);
      color: #fdc211;
    }

    .taocan, .zhekou {
      width: 48%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: rem(5);
      background: #fbefef;
      padding: rem(5) 0;

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

    p span {
      font-size: rem(12);
      color: #969799;
      padding: 0 rem(5);
    }
  }

  .content {
    .timer {
      width: 100%;
      height: rem(40);
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: rem(40);
      line-height: rem(40);
      font-size: rem(12);

      span {
        width: 23%;
        display: inline-block;
        height: rem(40);
        line-height: rem(40);
        text-align: center;
        box-sizing: border-box;
      }

      .cur {
        color: red;
        border-bottom: 2px solid red;
      }
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