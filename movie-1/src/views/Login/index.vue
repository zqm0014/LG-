<template>
  <div class="box">
    <div class="header">
      <span @click="Mine">X</span>
      <span>帮助</span>
    </div>
    <h1>登录</h1>
    <div class="login">
      <van-dialog class="tishi" v-model="isShow" show-cancel-button :beforeClose="beforeClose">
        <p>{{xinxi}}</p>
      </van-dialog>
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入用户名" focused="true" />
      </van-cell-group>
      <van-password-input
        :value="pwd"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
    <div class="btn">
      <van-button plain type="primary" @click="login">登录</van-button>
      <van-button plain type="info" to="/register">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //弹出框显示隐藏
      isShow: false,
      username: "",
      pwd: "",
      showKeyboard: true,
      //弹出框信息
      xinxi: ""
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    }
    // from(){
    //   return this.$route
    //   // this.from=this.$router.
    //   console.log(this.$route)
    // }
  },
  watch: {
    title(newVal, oldVal) {
      if (newVal == "ok") {
        this.xinxi = "登录成功";
        this.isShow = true;
      } else if (newVal == "pwderr") {
        this.xinxi = "密码错误";
        this.isShow = true;
        this.username = "";
        this.pwd = "";
      } else {
        this.isShow = true;
        this.username = "";
        this.pwd = "";
        this.xinxi = "没有该信息，请注册";
      }
    }
  },
  methods: {
    onInput(key) {
      this.pwd = (this.pwd + key).slice(0, 6);
    },
    onDelete() {
      this.pwd = this.pwd.slice(0, this.pwd.length - 1);
    },
    login() {
      this.$store.dispatch("LOGIN", {
        username: this.username,
        pwd: this.pwd
      });
    },
    Mine() {
      this.$router.go(-1);
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        if (this.xinxi == "登录成功") {
          if (this.$route.query.user === 0) {
            this.$router.push({ path: "/xuanzuo" });
          } else {
            this.$router.go(-1);
          }
        } else if (this.xinxi == "没有该信息，请注册") {
          this.$router.push({ path: "/register" });
        }
        done();
      } else if (action === "cancel") {
        done();
      }
    }
  }
};
</script>

<style scoped lang="stylus" src="./Login.styl"></style>