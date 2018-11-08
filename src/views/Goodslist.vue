<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
        <el-col :span="24">
            <el-input placeholder="请输入内容" class="searchInput" v-model="searchVal">
                <el-button slot="append" icon="el-icon-search" @click="checkUser()"></el-button>
            </el-input>
            <el-button type="success" @click="showAddUserDia()">添加商品</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column type="index" label="#" width="40">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="300">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="80">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80">
        </el-table-column>
        <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
                {{scope.row.add_time | fmtDate}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleBox(scope.row.id)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="pagenum" 
    :page-sizes="[20, 40, 60, 80]" 
    :page-size="pagesize" 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false,
            pagenum: 1,
            pagesize: 20,
            total: 0,
            searchVal: '',
        }
    },
    created() {
        this.pagenum = 1
        this.loadTableData()
    },
   methods: {
        handleSizeChange(val) {
            this.pagenum = val
            this.loadTableData()
            console.log(`每页: ${val}条`);
        },
        handleCurrentChange(val) {
            this.pagenum = val
            this.loadTableData()
            this.pagenum = 1
            console.log(`当前页: ${val}`);
        },
        async loadTableData() {
            const res = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
            // this.pagenum = 1
           console.log(res)
            this.list = res.data.data.goods
            this.total = res.data.data.total
            
        }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}

.searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
}

.searchArea .searchInput {
    width: 350px;
}
</style>
