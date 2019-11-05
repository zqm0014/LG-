<template>
    <div class="bigbox">
        <!--<div class="yc">-->
            <!--<span><i class="fa fa-angle-left" aria-hidden="true"></i></span>-->
            <!--<div>-->
                <!--<img src='' style="width: 50px">-->
                <!--<p>123</p>-->
                <!--<p>9.6<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>-->
            <!--</div>-->
            <!--<span><i class="fa fa-share-square-o" aria-hidden="true"></i></span>-->
        <!--</div>-->
        <div class="zhu" v-height>
            <div class="header">
                <span @click="fanHui"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
                <p >电影</p>
                <span><i class="fa fa-share-square-o" aria-hidden="true"></i></span>
            </div>
            <div class="xqTop">
                <img :src="list.cover" class="zhupic">
                <div>
                    <p>{{list.title}}</p>
                    <p>{{list.tag}}</p>
                    <p>{{list.act}}</p>
                    <p>{{list.year}}</p>
                    <div class="toubian">
                        <div :class="{cur:bianxin}" @click="bx">
                            <span>❤</span>
                            想看
                        </div>
                        <div :class="{cur:kanguo}" @click="kg">
                            <span>☆</span>
                            看过
                        </div>
                    </div>
                </div>
            </div>
            <div class="koubei">
                <div class="kbt">
                    <div>
                        <img src="/img/mao.png" alt="">
                        实时口碑
                    </div>
                    <p><span>102562人想看</span><span>89462人想看</span></p>
                </div>
                <div class="kbc">
                    <div class="pf"><span>9.6</span> <span>897994人评价</span></div>
                    <div class="tiaoteam">
                        <div>
                            <span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                  aria-hidden="true"></i><i
                                    class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                 aria-hidden="true"></i><i
                                    class="fa fa-star" aria-hidden="true"></i></span>
                            <div class="tiao">
            <span class="f">
            <span class="z"></span>
            </span>
                                <span class="jindu">90%</span>
                            </div>
                        </div>
                        <div>
                            <span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                  aria-hidden="true"></i><i
                                    class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                 aria-hidden="true"></i></span>
                            <div class="tiao">
            <span class="f">
            <span class="z"></span>
            </span>
                                <span class="jindu">90%</span>
                            </div>

                        </div>
                        <div>
                            <span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                  aria-hidden="true"></i><i
                                    class="fa fa-star" aria-hidden="true"></i></span>
                            <div class="tiao">
            <span class="f">
            <span class="z"></span>
            </span>
                                <span class="jindu">90%</span>
                            </div>

                        </div>
                        <div>
                            <span><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                  aria-hidden="true"></i></span>
                            <div class="tiao">
            <span class="f">
            <span class="z"></span>
            </span>
                                <span class="jindu">90%</span>
                            </div>

                        </div>
                        <div>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <div class="tiao">
            <span class="f">
            <span class="z"></span>
            </span>
                                <span class="jindu">90%</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="xian">
                    <span>NO.2</span>
                    <span>热映口碑榜</span>
                    <span class="jiantou">></span>
                </div>
            </div>
            <div class="jianjie">
                <p>
                    <span>简介</span>
                    <span @click="zhankai">展开</span>
                </p>
                <div class="xq" :class="{cur:jj}">
                    {{list.desc}}
                </div>
            </div>
            <div class="yzry">
                <p>
                    <span>演职人员</span>
                    <span @click="yyzhankai">全部26人</span>
                </p>
                <div class="yanYuan" :class="{cur:yy}">
                    <figure v-for="item of list.act_s">
                        <img :src="item.image">
                        <figcaption>
                            {{item.name}}
                        </figcaption>
                        <p>{{item.shi}}</p>
                    </figure>
                </div>
            </div>
            <div class="pinglun">
                <div class="plhexin">
                    <div class="plxtop">
                        <span>评论</span>
                        <span>参与讨论</span>
                    </div>
                    <div class="biaoqian">
                        <span>全部</span>
                        <span>好评</span>
                        <span>差评</span>
                        <span>购票认证</span>
                        <span>同城</span>
                    </div>
                    <p class="jx">精选</p>

                    <div class="liebiao" v-for="(item,index) of list.comment">
                        <pl :item="item" :list="list" :index="index"></pl>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div @click="mai(list.title)">特惠购票</div>
        </div>
        <!--<gp></gp>-->
    </div>
</template>

<script>
    import pl from './pinglun/index.vue'

    export default {
        name: "index",
        data() {
            return {
                jj: false,
                yy: false,
                bianxin: false,
                kanguo: false

            }
        },
        components:{
            pl
        },
        computed: {
            list() {
                return this.$store.state.moveXQ.filter(item => item.title == this.$route.query.title)[0]
            }
        },
        created() {
            this.$store.dispatch('GETALL')
            console.log(this.list)
        },
        methods: {
            bx() {
                this.bianxin = !this.bianxin
            },
            kg() {
                this.kanguo = !this.kanguo
            },
            zhankai() {
                this.jj = !this.jj
            },
            yyzhankai() {
                this.yy = !this.yy
            },
            mai(title) {
                console.log(title)
                this.$router.push({path:'/buyTicke',query:{name:title}})
            },
            fanHui(){
                this.$router.push({path: '/'})
            }

        }
    }
</script>

<style scoped lang="stylus" src="./index.styl">

</style>