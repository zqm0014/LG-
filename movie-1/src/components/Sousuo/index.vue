<template>
  <div class="sousuo" v-height>
    <div class="sskuang">
      <span @click="back"></span>
      <input type="text" placeholder="请输入电影名搜索" v-model="sousuo" autofocus />
      <p @click="dell" v-show="del"></p>
    </div>
    <div class="sslist">
      <ul v-if="sslist!=='no'">
        <li v-for="(item,index) in sslist" :key="index" @click="gomovieXQ(item.title,item.score)">
          <img :src=item.cover />
          <div>
            <p>{{item.title}}</p>
            <p>{{item.tag}}</p>
            <p>{{item.year}}</p>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>未找到相关影片</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      sousuo: "",
      del: false,
      settmout: null
    };
  },
  watch: {
    sousuo(val) {
      if (val) {
        this.del = true;
      } else {
        this.del = false;
      }
      let _this = this;
      clearTimeout(this.settmout);
      this.settmout = setTimeout(function() {
        console.log(val);
        _this.$store.dispatch("SOUSUO", { val });
      }, 500);
    }
  },
  computed: {
    sslist() {
      return this.$store.state.sousuo;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    dell() {
      this.sousuo = "";
    }
    ,gomovieXQ(title,score){
      this.$router.push({path :'/information', query : {title:title,score:score}})
    }
  }
};
</script>

<style  scoped lang='stylus'>
.sousuo .sskuang {
  margin: rem(10) rem(10);
  display: flex;
  justify-content: center;
  position: relative;
}

.sousuo .sskuang p {
  width: 20px;
  height: 20px;
  position: absolute;
  right: rem(25);
  top: rem(4);
  background: url('../../../public/img/del.png') 1px 0px no-repeat;
  border-radius: 50%;
  background-size: 20px 20px;
}

.sousuo .sskuang span {
  width: rem(28);
  display: inline-block;
  height: rem(28);
  line-height: rem(28);
  background: url('../../../public/img/back.png') 0px 0px no-repeat;
  background-size: 112% 109%;
  margin-right: rem(10);
}

.sousuo .sskuang input {
  height: rem(28);
  width: 80%;
  border: none;
  border-radius: rem(15);
  outline: none;
  padding-left: rem(35);
  background: url('../../../public/img/search.png') 10px 7px no-repeat #eee;
  background-size: 15px 15px;
}

.sousuo .sslist {
  border-top: rem(1) solid #eee;
  box-shadow: rem(1) 0 2px #ccc;
}

.sousuo .sslist ul {
  margin: rem(10) rem(10);
}

.sousuo .sslist li {
  display: flex;
  border-bottom: rem(1) solid #ccc;
  padding: rem(10) 0;
}

.sousuo .sslist li img {
  width: rem(70);
  height: rem(90px);
}
</style>

