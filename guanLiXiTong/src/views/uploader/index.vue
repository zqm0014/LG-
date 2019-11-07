<template>
  <el-row class="uploade-student">
    <h1>上传电影数据</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="uploade-ruleForm"
      label-position="left"
    >
      <el-form-item label="电影名" prop="title" >
        <el-input placeholder="请输入电影名" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="tag">
        <el-transfer
          v-model="ruleForm.tag"
          :data="tags"
          :titles="['未选', '已选']"
          :button-texts="['到左边', '到右边']"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="上映年份" prop="year">
        <el-date-picker type="date" v-model="ruleForm.year" placeholder="选择上映年份"></el-date-picker>
      </el-form-item>
      <el-form-item label="上映地点" prop="place">
        <el-input placeholder="请输入上映地点" v-model="ruleForm.place"></el-input>
      </el-form-item>
      <el-form-item label="电影时长" prop="duration">
        <el-input placeholder="请输入电影时长" v-model.number="ruleForm.duration">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>

      <el-form-item label="影片简介" prop="desc">
        <el-input type="textarea" placeholder="请输入影片简介" autosize v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="影片图片" prop="cover">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'movieImg'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="影厅" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="杜比全景声厅" name="type"></el-checkbox>
          <el-checkbox label="CINITY厅" name="type"></el-checkbox>
          <el-checkbox label="60帧厅" name="type"></el-checkbox>
          <el-checkbox label="DTS:X 临境音厅" name="type"></el-checkbox>
          <el-checkbox label="4K厅" name="type"></el-checkbox>
          <el-checkbox label="巨幕厅" name="type"></el-checkbox>
          <el-checkbox label="IMAX厅" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="想看" prop="like">
        <el-input placeholder="请输入想看人数" v-model.number="ruleForm.like">
          <template slot="append">人</template>
        </el-input>
      </el-form-item>
      <el-form-item label="评分" prop="score">
        <el-input placeholder="请输入评分" v-model="ruleForm.score">
          <template slot="prepend">猫眼评分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="影院/场次" prop="scenes1">
        <el-input placeholder="请输入今天有多少影院放映了这场电影" v-model.number="ruleForm.scenes1">
          <template slot="prepend">今天</template>
          <template slot="append">家影院</template>
        </el-input>
      </el-form-item>
      <el-form-item label="影院/场次" prop="scenes2">
        <el-input placeholder="请输入这部电影今天共放映了多少场" v-model.number="ruleForm.scenes2">
          <template slot="prepend">放映了</template>
          <template slot="append">   场</template>
        </el-input>
      </el-form-item>
      <el-form-item label="导演" prop="dir">
        <el-input placeholder="请输入导演" v-model="ruleForm.dir"></el-input>
      </el-form-item>
      <el-form-item label="导演图片" prop="dirImg">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'dirImg'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="演员1名字" prop="actName1">
        <el-input placeholder="请输入演员1名字" v-model="ruleForm.actName1"></el-input>
      </el-form-item>
      <el-form-item label="演员1饰演角色" prop="actShi1">
        <el-input placeholder="请输入演员1饰演角色" v-model="ruleForm.actShi1"></el-input>
      </el-form-item>
      <el-form-item label="演员1图片" prop="actImg1">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'actImg1'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="演员2名字" prop="actName2">
        <el-input placeholder="请输入演员2名字" v-model="ruleForm.actName2"></el-input>
      </el-form-item>
      <el-form-item label="演员2饰演角色" prop="actShi2">
        <el-input placeholder="请输入演员2饰演角色" v-model="ruleForm.actShi2"></el-input>
      </el-form-item>
      <el-form-item label="演员2图片" prop="actImg2">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'actImg2'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="演员3名字" prop="actName3">
        <el-input placeholder="请输入演员3名字" v-model="ruleForm.actName3"></el-input>
      </el-form-item>
      <el-form-item label="演员3饰演角色" prop="actShi3">
        <el-input placeholder="请输入演员3饰演角色" v-model="ruleForm.actShi3"></el-input>
      </el-form-item>
      <el-form-item label="演员3图片" prop="actImg3">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'actImg3'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="演员4名字" prop="actName4">
        <el-input placeholder="请输入演员4名字" v-model="ruleForm.actName4"></el-input>
      </el-form-item>
      <el-form-item label="演员4饰演角色" prop="actShi4">
        <el-input placeholder="请输入演员4饰演角色" v-model="ruleForm.actShi4"></el-input>
      </el-form-item>
      <el-form-item label="演员4图片" prop="actImg4">
        <el-upload
          drag
          action="/img"
          :data = "{lujing: 'actImg4'}"
          multiple
          v-loading="$store.state.loading"
          :on-success="handleSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>

    <div class="submitBtn">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    const tags = [
      { key: `冒险`, label: `冒险` },
      { key: `喜剧`, label: `喜剧` },
      { key: `爱情`, label: `爱情` },
      { key: `战争`, label: `战争` },
      { key: `恐怖`, label: `恐怖` },
      { key: `犯罪`, label: `犯罪` },
      { key: `悬疑`, label: `悬疑` },
      { key: `惊悚`, label: `惊悚` },
      { key: `武侠`, label: `武侠` },
      { key: `科幻`, label: `科幻` },
      { key: `音乐`, label: `音乐` },
      { key: `歌舞`, label: `歌舞` },
      { key: `动画`, label: `动画` },
      { key: `奇幻`, label: `奇幻` },
      { key: `家庭`, label: `家庭` },
      { key: `伦理`, label: `伦理` }
    ];
    return {
      lock: false,
      checkAll: false,
      isIndeterminate: true,
      tags: tags,
      ruleForm: {
        title: "",
        tag: [`爱情`, `喜剧`],
        year: "",
        place: "",
        duration: "",
        desc: "",
        cover: "",
        type: [],
        like: "",
        score: "",
        scenes1: "",
        scenes2: "",
        dir: "",
        dirShi: null,
        dirImg: "",
        actName1: "",
        actShi1: "",
        actImg1: "",
        actName2: "",
        actShi2: "",
        actImg2: "",
        actName3: "",
        actShi3: "",
        actImg3: "",
        actName4: "",
        actShi4: "",
        actImg4: "",
      },
      rules: {
        title: [{ required: true, message: "请输入电影名", trigger: "blur" }],
        tag: [{ required: true, message: "请选择电影类型", trigger: "change" }],
        act: [
          {
            required: true,
            message: "请输入演员名，以空格隔开",
            trigger: "blur"
          }
        ],
        year: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        place: [{ required: true, message: "请输入上映地点", trigger: "blur" }],
        duration: [
          {
            required: true,
            type: "number",
            message: "请输入电影时长（分钟）",
            trigger: "blur"
          }
        ],
        dir: [{ required: true, message: "请输入导演", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个电影类型",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请填写电影简介", trigger: "blur" },{min: 10, message: "最少10个字", trigger: "blur"}],
        like: [
          {
            required: true,
            type: "number",
            message: "请填写想看的人数",
            trigger: "blur"
          }
        ],
        score: [
          {
            required: true,
            message: "请填写评分",
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          // console.log("submit")
          // console.log("this.ruleForm:",this.ruleForm)
          this.$store.dispatch("ADDFILM", {
            from: this.ruleForm,
            cb: this.cbRouter
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    cbRouter() {
      this.$router.push({ path: "/dianYing" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSuccess(res, file) {
      // 将文件名 赋值给ruleForm里面 让addstudent 时候 post出去
      // console.log("res",res)
      // console.log("file",file)
      // let arr = [act1, act2]
      // console.log(res[0])
      // console.log(res[1])
      switch (res[1]) {
        case 'movieImg':
          this.ruleForm.cover = res[0];
          break;
        case 'dirImg':
          this.ruleForm.dirImg = res[0];
          break;
        case 'actImg1':
          this.ruleForm.actImg1 = res[0];
          break;
        case 'actImg2':
          this.ruleForm.actImg2 = res[0];
          break;
        case 'actImg3':
          this.ruleForm.actImg3 = res[0];
          break;
        case 'actImg4':
          this.ruleForm.actImg4 = res[0];
          break;
      }
      // this.ruleForm.cover = res[0];
      // console.log("this.ruleForm.cover",this.ruleForm.cover)
    },
  }
};
</script>

<style scoped lang='stylus'>
.uploade-student {
  h1 {
    font-size: 24px;
    width: 96%;
    margin: 20px auto;
    font-weight: normal;
  }

  .uploade-ruleForm {
    width: 96%;
    margin: 0px auto;
  }

  .avatar-uploader, .submitBtn {
    margin: 30px 75px;
  }
}

>>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

>>>.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

>>>.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

>>>.el-loading-mask {
  width: 180px;
  height: 180px;
}

>>>.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>