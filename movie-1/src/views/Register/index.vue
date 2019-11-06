<template>
  <div class="box">
    <div class="header">
      <span @click="fanhui">X</span>
      <span>帮助</span>
    </div>
    <h1>注册</h1>
    <van-dialog class="tishi" v-model="isShowxinxi" show-cancel-button :beforeClose="beforeClose">
      <p>{{xinxi?"注册成功":"用户已注册"}}</p>
    </van-dialog>
    <van-cell-group>
      <van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" />
      <van-field v-model="pwd" type="password" label="密码" placeholder="请输入6位数字密码" @blur="test1" />
      <van-field
        v-model="confirmpwd"
        type="password"
        label="确认密码"
        placeholder="请输入密码"
        @blur="test"
      />
    </van-cell-group>
    <div class="msg">
      <span class="message" :class="{'cur':this.bian?'cur':''}">{{msg}}</span>
    </div>
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        action="/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="btn">
      <van-button plain type="info" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowxinxi: false,
      isShow: false,
      username: "",
      pwd: "",
      confirmpwd: "",
      msg: "",
      bian: false,
      imageUrl: "",
      imgUrl: "",
      xinxi: false
    };
  },
  computed: {
    addmsg() {
      return this.$store.state.addmsg;
    }
  },
  watch: {
    addmsg(newVal, oldVal) {
      if (newVal == "ok") {
        this.xinxi = true;
        this.isShowxinxi = true;
        console.log("注册成功");
      } else {
        this.xinxi = false;
        this.isShowxinxi = true;
        console.log("该用户已注册");
      }
    }
  },
  methods: {
    register() {
      if (this.pwd == this.confirmpwd && this.pwd.length == 6) {
        this.$store.dispatch("ADD", {
          username: this.username,
          pwd: this.pwd,
          imageUrl: this.imgUrl
        });
      } else {
        console.log("密码格式不对");
      }
    },
    fanhui(){
      this.$router.push({path:"/mine"})
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        if (this.xinxi) {
          this.$router.push({ path: "/login" });
          this.isShowxinxi = false;
        } else {
          this.username = "";
          this.pwd = "";
          this.confirmpwd = "";
          this.imageUrl = "";
        }
        done();
      } else if (action === "cancel") {
        done();
      }
    },
    test() {
      if (this.pwd == this.confirmpwd) {
        this.msg = "";
        this.bian = false;
      } else {
        this.msg = "密码不一致";
        this.bian = true;
      }
    },
    test1() {
      if (this.pwd.length < 6) {
        this.msg = "密码必须为6位";
        this.bian = true;
      } else {
        this.msg = "";
        this.bian = false;
      }
    },

    handleAvatarSuccess(res, file) {
      // 只是为了显示图片而已
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style scoped lang="stylus">
.box {
  width: 96%;
  margin: 0 auto;
  padding: rem(20) 0;
  font-size: rem(14);

  .header {
    height: rem(20);
    line-height: rem(20);
    display: flex;
    justify-content: space-between;
    padding: rem(5) rem(20);
    color: red;
    font-size: rem(20);
  }

  h1 {
    font-weight: normal;
    margin: rem(30) rem(50);
  }

  .msg {
    height: rem(20);
  }

  span.message {
    margin: rem(2) rem(120);
  }

  .btn {
    width: 80%;
    margin: rem(50) auto;

    .van-button {
      width: 100%;
    }
  }
}

.cur {
  color: red;
}

.van-cell {
  font-size: rem(20);
  margin: rem(5) 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.tishi p {
  height: rem(100);
  line-height: rem(100);
  text-align: center;
}
</style>