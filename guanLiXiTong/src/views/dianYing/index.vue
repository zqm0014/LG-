<template>
    <el-row class="student-movieDetails">
        <h1>电影列表</h1>
        <el-table 
            :data="movieDetails" 
            style="width: 96%" 
            max-height="500"
            class="student-table"
            :default-sort = "{prop: 'movieTag', order: 'ascending'}"
        >
            <el-table-column prop="cover" label="标题图片" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt style="width:100%;" />
                </template>
            </el-table-column>
            <el-table-column prop="title" sortable label="电影名" width="150"></el-table-column>
            <el-table-column prop="tag"  label="类型" width="140"></el-table-column>
            <el-table-column prop="dir" label="导演" width="150"></el-table-column>
            <el-table-column prop="act" label="演员" width="150"></el-table-column>
            <el-table-column prop="year" label="时间" width="200"></el-table-column>
            <el-table-column prop="like" sortable label="想看" width="100"></el-table-column>
            <el-table-column prop="score" sortable label="评分" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope)" type="text" size="small">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    created() {
        this.$store.dispatch("GETFILM");
        this.$store.commit("ISLOADING", true);
    },
    computed: {
        movieDetails() {
            return this.$store.state.movieDetails
        }
    },
    methods: {
        deleteRow(scope) {
            this.$store.dispatch("DEL", {
                id: scope.row.id
            });
 
            this.$store.commit("ISLOADING", true);
        }
    }
};
</script>

<style scoped lang='stylus'>
.student-movieDetails {
    h1 {
        font-size: 24px;
        width: 96%;
        margin: 20px auto;
        font-weight: normal;
    }

    .student-table {
        border: 1px solid #eee;
        margin: 0 auto;
    }
}
</style>