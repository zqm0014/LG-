<template>
  <div>
      <!--<div class="liebiao" v-for="item of list.comment">-->
          <div class="lbtop">
              <div>
                  <img :src="item.image"  alt="">
              </div>
              <p class="mingzi">{{item.name}}</p>
              <p>这不作品打了10分</p>
          </div>
          <div class="lbbottom">
              <p>{{item.txt}}</p>
              <div>
                                <span>
                                    3天前
                                </span>
                  <span :class={cur:item.state} @click="zan(index)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>点赞</span>
                  <span > <i class="fa fa-commenting-o" aria-hidden="true"></i>{{item.zan}}</span>
              </div>
          </div>
      <!--</div>-->
  </div>

</template>

<script>
    export default {
        name: "index",
        props:['item','list','index'],
        computed: {

        },
        methods:{
           zan(){
               this._props.item.state = !this._props.item.state
           }
        }
    }
</script>

<style scoped lang="stylus">
    .pinglun {
        width: 100%
        border-radius rem(20) rem(20) 0 0
        background #fff
        margin-top rem(20)
        margin-bottom rem(45)

        .plhexin {
            width: 90%
            margin-left: rem(20)
            font-size rem(14)

            .jx {
                border-bottom: 1px solid #D4D0EE
                border-top: 1px solid #d4d0ee
                margin: rem(20) 0
                padding rem(10) 0
            }

            .plxtop {
                span:nth-of-type(2) {
                    float: right
                    border-radius rem(20)
                    background: #ee3b34
                    color #fff
                    padding: rem(5) rem(15)
                }

                span:nth-of-type(1) {
                    font-size rem(16)
                    font-weight bolder
                }
            }
        }
    }

    .liebiao {
        padding rem(10)
        border-bottom: 1px solid #d4d0ee
    }

    .lbtop {
        div {
            width rem(50)
            height rem(50)
            border-radius 50%
            overflow: hidden
            float left

            img {
                width 100%
            }
        }

        .mingzi {
            color: #000
        }

        p {
            color #c2c4ee
            padding: rem(4) rem(65)
        }
    }

    .lbbottom {
        padding-top: rem(10)
        margin-left: rem(66);
        width: rem(250);

        div {
            margin-top rem(10)
            padding rem(10)

            span:nth-of-type(1) {
                color: #666

            }

            span:nth-of-type(2) {
                float: right
                border 1px solid
                padding: rem(5)
                border-radius rem(20)
                margin-right: rem(5)
                &.cur{
                    background red
                }
            }

            span:nth-of-type(3) {
                float: right
                border 1px solid
                padding: rem(5)
                border-radius rem(20)
                margin-right: rem(10)
                margin-bottom: rem(5)
                &.cur{
                    background red
                }
            }
        }
    }
</style>