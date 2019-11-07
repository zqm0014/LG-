<template>
    <el-row class="student-cinema">
        <h1>影院列表</h1>
        <el-table 
            :data="cinema" 
            style="width: 96%" 
            max-height="500"
            class="student-table"
            :default-sort = "{prop: 'movieTag', order: 'ascending'}"
        >
            <el-table-column prop="title" label="影院名" width="250"></el-table-column>
            <el-table-column prop="address"  label="影院地址" width="320"></el-table-column>
            <el-table-column prop="price" label="起步价" width="150"></el-table-column>
            <el-table-column prop="Keyword" label="标签" width="180"></el-table-column>
            <el-table-column prop="hui" label="惠" width="180"></el-table-column>
            
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
        this.$store.dispatch("GETCINEMA");
        this.$store.commit("ISLOADING", true);
    },
    computed: {
        cinema() {
            // console.log(this.$store.state)
            // if(this.$store.state.cinema.length <= 0) return []
            return this.$store.state.cinema
        }
    },
    methods: {
        deleteRow(scope) {
            // console.log("删除的id:",scope.row.id);
            this.$store.dispatch("DEL", {
                id: scope.row.id
            });
 
            this.$store.commit("ISLOADING", true);
        }
    }
};
</script>

<style scoped lang='stylus'>
.student-cinema {
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