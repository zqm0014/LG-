<template>
  <div class="xuanzuo">
    <div class="xz-header">
      <span @click="goback">〈</span>
      <p>昌平暴力影城（昌平西关店）</p>
      <span>〉</span>
    </div>
    <div v-height=50>
    <div class="xz-dyName">
      <h3>少年的你</h3>
      <span>今天11月3日</span>
      <span>20:40</span>
      <span>国语3D</span>
    </div>
    <div class="xz-main" v-height=246>
      <div class="pm">2号厅银幕</div>
      <p class="text">银幕中央</p>
      <ul class="xuhao">
        <li v-for="(item,index) of zuowei" :key="index">{{index+1}}</li>
      </ul>
      <div class="zuowei">
        <ul v-for="(item,index) of zuowei" :key="index">
          <li
            v-for="(itemChild,indexChild) of item"
            :key="indexChild"
            @click="djxz(index,indexChild,itemChild.zhuangtai,itemChild.price)"
          >
            <img :src="itemChild.img" alt />
          </li>
        </ul>
      </div>  
    </div>
     <div class="xzOk">
          <div class="yx" v-if="isShow">
              <div class="txt">已选座位</div>
              <ul>
                  <li v-for="(item,index) of yixuanzuowei" :key="index">
                      <div class="d1">
                          <p>{{item.pai}}排{{item.zuo}}座</p>
                      <span>{{item.price}}元</span>
                      </div>
                      <div class="d2" @click="delZw(item.pai,item.zuo)">x</div>
                      </li>
              </ul>
              <button class="but">{{gpprice}}元 确认选座</button>
          </div>
          <div class="wx" v-else>
              <div>
              <img src="/img/xz-b-02.png" alt="">
              <span>可选</span>
              <img src="/img/xz-l-02.png" alt="">
              <span>已选</span>
              <img src="/img/xz-h-01.png" alt="">
              <span>不可选</span>
              </div>
              <p class="but">请先选座</p>
          </div>
      </div>
      <div class="tanchuang" v-show="tanchuang">每次最多选择4个座位</div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        yixuanzuowei:[],//选中的座位号
        isShow:false,//显示底部
        tanchuang:false,//是否弹窗
        gpprice:0,//购票总价
      xuhao: [],//页面左序号
      zuowei: [//后台获取数据
        [
          {
              price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          {
               price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-h-01.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: true
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ],
        [
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          },
          { price:38,
            img: "/img/xz-b-02.png",
            imglv: "/img/xz-l-02.png",
            zhuangtai: false
          }
        ]
      ]
    };
  },
  methods: {
    djxz(pai, zuo, zt,price) {//参数1.第几排 2.第几个座位 3.是否为已售出 4.每个座位单价
      if (!zt) { //判断是否为红色 
      if(this.yixuanzuowei.length<4||this.zuowei[pai][zuo].img == "/img/xz-l-02.png"){//判断已选几个座位 最多选4个
if(this.zuowei[pai][zuo].img=="/img/xz-b-02.png"){//判断是白的
               var obj={
              pai:pai+1,
              zuo:zuo+1,
              price:price
          }
          this.yixuanzuowei.push(obj)
          }else{//判断是绿的
              this.yixuanzuowei.forEach((item,i)=>{
                  if(item.pai-1==pai&&item.zuo-1==zuo){
                      this.yixuanzuowei.splice(i,1)
                  }
              })
          }  
          //判断页面底部该显示已选样式，还是未选样式
          if(this.yixuanzuowei.length>0){
              this.isShow=true              
          }else{
              this.isShow=false
          }
          //计算已选座位的总价
        this.yixuanzuowei.forEach((item,i)=>{
          this.gpprice=item.price*(i+1)
        })
        //判断切换白绿图片
        if (this.zuowei[pai][zuo].img == "/img/xz-b-02.png") {
          this.zuowei[pai][zuo].img = "/img/xz-l-02.png";
        } else if (this.zuowei[pai][zuo].img == "/img/xz-l-02.png") {
          this.zuowei[pai][zuo].img = "/img/xz-b-02.png";
        }
      }else if(this.yixuanzuowei.length>=4&&this.zuowei[pai][zuo].img == "/img/xz-b-02.png"){//选座座位超过4个弹窗提示
          this.tanchuang=true;
         var _this=this
         console.log(this.yixuanzuowei)
          setTimeout(function(){
              _this.tanchuang=false;
          },2000)
      }        
      }
    },
    delZw(pai,zuo){
        //删除已选座位中的数据
        this.yixuanzuowei.forEach((item,i)=>{
                  if(item.pai==pai&&item.zuo==zuo){
                      this.yixuanzuowei.splice(i,1)
                  }
              })
        //删除时让对应图片变白色
        this.zuowei[pai-1][zuo-1].img = "/img/xz-b-02.png"
        //当已选座位被全部删除时切换下部样式
        if(this.yixuanzuowei.length<1){
            this.isShow=false
        }
        //删除时重新计算已选座位价格
        this.yixuanzuowei.forEach((item,i)=>{
          this.gpprice=item.price*(i+1)
        })
    },
    goback(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="stylus" scoped>
.xuanzuo {
    width 100%
    position relative;
    .tanchuang{
        background rgba(0,0,0,0.7);
        color #fff;
        text-align center;
        line-height 35px;
        border-radius 5px;
        width 200px;
        height 35px;
        position absolute;
        top 50%;
        left 50%;
        margin-left -100px;
    }
  .xz-header {
      width 100%;
    background: crimson;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .xz-dyName {
      width 100%;
      padding 10px 10px;
    span {
      font-size: 13px;
      padding-right: 10px;
      color: #666; 
    }
  }
  .xz-main {
      width 100%
      flex 1;
    background: #eee;
    position: relative;
    height: 420px;
    .pm {
      background: #ccc;
      margin: 0 auto;
      width: 60%;
      height: 20px;
      text-align: center;
      border-radius: 0 0 40% 40%;
    }
    .text {
      border: 1px solid #ccc;
      position: absolute;
      left: 50%;
      top: 50px;
      margin-left: -25px;
      width: 50px;
      font-size: 12px;
    }
    .xuhao {
      position: absolute;
      left: 10px;
      top: 87px;
      background #999;
      padding 10px 0;
      border-radius 10px;
      li {
        margin: 5px 3px;
        font-size: 14px;
        color #fff;
      }
    }
    .zuowei {
      position: absolute;
      top: 100px;
      left: 40px;
      ul {
        list-style: none;
        display: flex;

        li {
          margin: 1.5px 2px;

          img {
            width: 25px;
          }
        }
      }
    }
  }
  .xzOk{
      margin 0 10px;
      width 95%
      position absolute;
      bottom 0;
      .yx{
          width 100%
          .txt{
              margin 10px 0;
          }
          ul{
              width 100%
              display flex;
              list-style none;
              li{
                  color #666;
                  display flex;
                  align-items center;
                  width 23%;
                  margin 0 2px;
                  border 1px solid #ccc;
                  border-radius 4px;
                  .d2{
                      height 20px;
                      width 20px;
                      line-height 20px;
                      float right;
                      text-align center;
                  }
                  .d1{
                    span{
                      color red;
                      font-size 13px;
                    }
                  }
                  
              }
          }
          .but{
              width 100%;
              height 45px;
              background orange;
              border-radius 7px;
              text-align center;
              line-height 45px;
              color #fff;
              font-size 18px;
              margin 10px 0;
          }
      }
      .wx{
          div{
              background #eee;
              height 75px;
              display flex;
              justify-content center;
              align-items center;
              img{
                  width 25px;
                  margin 0 15px;
              }
          }
          .but{
              width 100%;
              height 45px;
              background orange;
              border-radius 5px;
              text-align center;
              line-height 45px;
              color #fff;
              font-size 18px;
              margin 10px 0;
              opacity 0.5;
          }
      }
  }
}
</style>



