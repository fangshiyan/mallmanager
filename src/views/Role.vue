<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row>
        <el-col :span="24">
            <el-button class="addbtn" type="success" plain>添加角色</el-button>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
        <!-- 展示 type -->
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row class="level1" v-for="(item1,index) in scope.row.children" :key="index">
                    <el-col :span="4">
                        <el-tag @close="deleRole(scope.row,item1.id)" closable type="success">{{item1.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row class="level2" v-for="(item2,index) in item1.children" :key="index">
                            <el-col :span="6">
                                <el-tag @close="deleRole(scope.row,item2.id)" closable type="warning">{{item2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="18">
                                <el-tag @close="deleRole(scope.row,item3.id)" closable type="error" v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="scope.row.children.length===0">
                    未分配权限
                </el-row>
            </template>
        </el-table-column>
        <el-table-column label="#" type="index">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="160">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleBox(scope.row.id)"></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="showRoleBox(scope.row)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            rolelist: []
        }
    },
    created() {
        this.loadTableData()
    },
    methods: {
        // 删除权限
        async deleRole(role,rightId) {
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            console.log(res)
            this.loadTableData()
            role.children = res.data.data
        },
        async loadTableData() {
            const res = await this.$http.get(`roles`)
            console.log(res)
            this.rolelist = res.data.data

        },
        //请求表格数据
        // async loadTableData() {
        // const res = await this.$http.get(`roles`)
        // this.rolelist = res.data.data
        // }
    }
}
</script>

<style>
.box-card {
    height: 100%;
}

.addbtn {
    margin-top: 10px;
}

.level2 {
    margin-bottom: 10px;
}

.level1 {
    margin-bottom: 10px;
}
</style>
