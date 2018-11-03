<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
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
            <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="formData.password" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdituser">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input disabled v-model="formData.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formData.email" autocomplete="off"></el-input>

            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdituser = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleSetrole">
        <el-form :model="formData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input disabled v-model="formData.username" autocomplete="off"></el-input>
                {{currUserName}}
            </el-form-item>

            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="currRoleId">
                    <el-option disabled label="请选择" :value="-1">

                    </el-option>
                    <el-option v-for="(item, index) in roles" :label="item.roleName" :key="index" :value="index">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleSetrole = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
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
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleBox(scope.row.id)"></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="showRoleBox(scope.row.id)"></el-button>
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
            searchVal: '',
            dialogFormVisibleAdduser: false,
            formData: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            },
            formLabelWidth: '100px',
            dialogFormVisibleEdituser: false,
            dialogFormVisibleSetrole: false,
            currUserName: '',
            currRoleId: -1,
            roles: [],
            currUserId: -1
        }
    },
    created() {
        this.loadTableData()
    },

    methods: {
        //分配权限
        async setRole() {
            const res = await this.$http.put(`users/${this.currUserId}/role`, {
                rid: this.currRoleId
            })
            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            this.$message.success(msg)
            this.dialogFormVisibleSetrole = false
            this.currRoleId = -1
        },
        async showRoleBox(user) {
            this.currUserId = user.id
            this.currUserName = user.username
            this.dialogFormVisibleSetrole = true
            const res = await this.$http.get('roles')
            const res2 = await this.$http.get(`users/${user}`)
            // console.log(res2)
            this.currRoleId = res2.data.data.rid
            this.roles = res.data.data
        },
        //编辑用户
        async editUser() {
            this.dialogFormVisibleEdituser = false
            const res = await this.$http.put(`users/${this.formData.id}`, this.formData)
            console.log(res)
            this.loadTableData()
            this.$message.success(res.data.meta.msg)
        },
        async showEditBox(userId) {
            this.dialogFormVisibleEdituser = true
            const res = await this.$http.get(`users/${userId}`)
            console.log(res)
            this.formData = res.data.data

        },
        //添加用户
        async addUser() {
            this.dialogFormVisibleAdduser = false
            const res = await this.$http.post('users', this.formData)
            // console.log(res)
            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            this.loadTableData()
            this.$message.success(msg)
            for (const key in this.formData) {
                if (this.formData.hasOwnProperty(key)) {
                    this.formData[key] = ''
                }
            }
        },
        showAddUserDia() {
            this.dialogFormVisibleAdduser = true
        },
        //删除提示框
        showDeleBox(userId) {
            this.$confirm('Sure?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(async () => {
                    console.log(userId)
                    const res = await this.$http.delete(`users/${userId}`)
                    console.log(res)
                    const {
                        meta: {
                            msg,
                            status
                        }
                    } = res.data
                    if (status === 200) {
                        this.loadTableData()
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        async changeSwitchMgstate(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            // console.log(res)
            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
            } else {

            }
        },
        checkUser() {
            this.loadTableData()
        },
        handleSizeChange(val) {
            this.pagenum = val
            this.loadTableData()
            console.log(`每页: ${val}条`);
        },
        handleCurrentChange(val) {
            this.pagenum = val
            this.loadTableData()
            console.log(`当前页: ${val}`);
        },
        async loadTableData() {
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
