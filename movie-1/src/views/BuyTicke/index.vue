<template>
    <div class="dataCinema">
        <nav>{{this.$router.history.current.query.name}}</nav>
        <!-- <p>{{show}}</p> -->
        <ul class="nav">
            <li>10月20日</li>
            <li>10月21日</li>
            <li>10月22日</li>
            <li>10月23日</li>
            <li>10月24日</li>
        </ul>
        <div class="counte">
            <ul>
                <li v-for="(item,index) of show" @click="XQ(item.title)" :key="index">
                    <router-view></router-view>
                    <p class="content-title">
                        <span>{{item.title}}</span>
                        <span>{{item.price}}</span>
                    </p>
                    <p class="content-address">
                        <span>{{item.address}}</span>
                    </p>
                    <p class="content-keyword">
                        <span v-for="(items,indexs) of item.Keyword" :key="indexs">{{items}}</span>
                    </p>
                    <p class="content-ka">
            <span>
              <b>卡</b>
              {{item.ka}}
            </span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods:{
            XQ(){
                this.$router.push({path:'/yyxq',query:{name:this.$router.history.current.query.name}})
            }
        },
        computed: {
            show() {
                // console.log(this.$store.state.cinema)
                return this.$store.state.cinema;
            },
        },
        created() {
            this.$store.dispatch("SHOW");
            this.$store.dispatch("buyCinema");
        }
    };
</script>

<style  scoped lang="stylus">
    .nav {
        width: 100%;
        height: 20px;
        line-height: 20px;
        list-style: none;

        li {
            width: 20%;
            float: left;
            border-bottom: solid 1px #e3e3e3;
        }
    }

    .counte {
        width: 100%;
        box-sizing: border-box;

        ul {
            li {
                padding: 15px 5px;
                width: 100%;
                line-height: 20px;
                border-bottom: solid 1px #e3e3e3;

                .content-title {
                    font-size: 16px;
                    color: #000;
                    font-weight: 600;

                    span:last-child {
                        float: right;
                        margin-right: 10px;
                        color: red;
                        font-size: 14px;
                    }
                }

                .content-address {
                    color: #333;
                    font-size: 12px;
                }

                .content-keyword {
                    span {
                        margin: 0 5px;
                        font-size: 10px;
                        border: solid 1px yellowgreen;
                    }
                }

                .content-ka {
                    font-size: 10px;

                    b {
                        padding: 2px;
                        background: purple;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>