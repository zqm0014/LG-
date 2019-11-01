<template>
  <div v-height="135" class="box">
    <div class="noticeBar">
      <van-notice-bar 
        text="11月电影上映表 01.哪吒之魔童降世  02.西虹市首富  03.使徒行者2  04.红海行动  05.鼠胆英雄  06.大侦探皮卡丘  07.唐人街探案2  08.一条狗的使命  09.我不是药神  10.流浪地球" 
        left-icon="volume-o" 
      />
    </div>
    
    <div class="header">{{ dateTime | dateFormat }}</div>
    <div class="big">
      <div class="content" v-height="215">
        <div class="detail" v-for="(item, index) in arr" :key="index">
          <div class="left">
            <img src="/img/9.jpeg" alt />
            <img src="/img/bofang.png" alt />
          </div>
          <div class="right">
            <ul @click="information(item)">
              <li>
                <span 
                  v-for="(child, _index) in item.title" 
                  :key="_index" 
                  class="title"
                >{{child}}</span>
                <span
                  class="type" 
                  v-for="(child) in item.type" 
                  :key="child"
                  :class="{imax : child == 'IMAX'}"
                >{{child}}</span>
              </li>
              <li>
                <span>{{item.like}}</span>人想看
              </li>
              <li>类型:{{item.tag}}</li>
              <li>主演:{{item.act}}</li>
            </ul>
            <p @click="buyTicke(item.title)">预售</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dateTime: new Date().getTime(),
      currentMonth : new Date().getMonth() + 1

    };
  },
  created() {
    this.$store.dispatch("GETHOME");
  },
  computed: {
    arr() {
       { 
          const shuffle = (arr) => {
          for (let i = 1;i<arr.length; i++){
            const random = Math.floor(Math.random() * (i+1));
            [arr[i], arr[random]] = [arr[random], arr[i]];
          };
          return arr
        }
      return shuffle(this.$store.state.arr)
      }
    }
  },
  methods: {
    buyTicke(title){
      this.$router.push({path :'/buyTicke',  query : {title}})
    },
    information(title){
      this.$router.push({path :'/information', query :{title}})
    }
  },
  //过滤器，显示日期
  filters: {
    dateFormat(dataStr) {
      var time = new Date(dataStr);
      var month = time.getMonth() + 1;
      var day = time.getDate();
      var weekday = time.getDay();
      let nowTime =
        month +
        "月" +
        day +
        "日" +
        " " +
        (weekday ? "周" + "日一二三四五六".charAt(weekday) : null);
      return nowTime;
    }
  }
};
</script>

<style scoped lang = "stylus">
.box {
  overflow-y: hidden;

  .noticeBar {
    width: 100%;
    height: rem(30px);
    line-height: rem(30px);
    margin: rem(10px) 0;
  }

  .header {
    width: 90%;
    margin: 0 auto;
    height: rem(30px);
    line-height: rem(30px);
    font-size: rem(14px);
    font-weight: bold;
  }

  .big {
    width: 100%;
    overflow-y: scroll;

    .content {
      width: 90%;
      margin: 0 auto;

      .detail {
        width: 100%;
        height: rem(100px);
        display: flex;
        justify-content: space-between;
        margin: rem(15px) 0;
        flex: 1 3;

        .left {
          position: relative;

          img:nth-child(1) {
            width: rem(65px);
            height: rem(85px);
            border-radius: rem(5px);
          }

          img:nth-child(2) {
            width: rem(30px);
            height: rem(30px);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .right {
          width: calc(100% - 85px);
          height: rem(100px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          flex: 2 1;

          p {
            width: 15%;
            border-radius: rem(50px) rem(50px) rem(50px) rem(50px);
            background: #007aff;
            color: #fff;
            text-align: center;
            font-size: rem(12px);
            padding: rem(2px) 0;
          }

          ul {
            width: 80%;
            height: rem(100px);
            padding-left: rem(10px);
            line-height: 1.6;

            li:nth-child(1) {
              display: flex;
              align-items: center;

              .title {
                font-size: rem(14px);
                font-weight: bold;
                color: #000;
              }

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

            li:not(.first) {
              font-size: rem(12px);

              span {
                color: orange;
              }
            }

            li:nth-child(4) {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>