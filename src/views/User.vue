<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchArea">
        <el-col :span="24">
            <el-input placeholder="请输入内容" class="searchInput" v-model="searchVal">
                <el-button slot="append" icon="el-icon-search" @click="checkUser()"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column type="index" label="#" width="40">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="140">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="100">
        </el-table-column>
        <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
                {{scope.row.create_time | fmtDate}}
            </template>
        </el-table-column>
        <el-table-column prop="date" label="用户状态" width="80">
            <template slot-scope="scope">
                <el-switch @change="changeSwitchMgstate(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
            <template slot-scope="scope">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
            pagesize: 2,
            currentPage: 1,
            total: 0,
            searchVal: ''
        }
    },
    created() {
        this.loadTableDate()
    },
    methods: {
        async changeSwitchMgstate(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            // console.log(res)
            const {meta:{status, msg}} = res.data
            if (status===200) {
                this.$message.success(msg)
            }else {

            }
        },
        checkUser() {
            this.loadTableDate()
        },
        handleSizeChange(val) {
            this.pagenum = val
            this.loadTableDate()
            console.log(`每页: ${val}条`);
        },
        handleCurrentChange(val) {
            this.pagenum = val
            this.loadTableDate()
            console.log(`当前页: ${val}`);
        },
        async loadTableDate() {
            this.loading = true
            const AUTH_TOKEN = sessionStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
            console.log(res)
            this.total = res.data.data.total
            const {
                meta: {
                    msg,
                    status
                },
                data: {
                    users
                }
            } = res.data
            if (status === 200) {
                this.loading = false
                this.list = users
                this.pagenum = 1
                this.pagesize = 2
                this.currentPage = 1
                // console.log(this.list)
            }
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
