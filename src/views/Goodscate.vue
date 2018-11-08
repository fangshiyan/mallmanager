<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-row class="searchArea">
        <el-col :span="24">
            <el-button type="success" @click="showAddGoodDia()">添加商品</el-button>
        </el-col>
    </el-row>
    <!-- 添加得类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.cat_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
                {{selectedOptions}}
                <el-cascader change-on-select clearable expand-trigger="hover" :options="caslist" :props="defaultProp" v-model="selectedOptions">
                </el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
        <el-tree-grid prop="cat_name" label="分类名称" width="300" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children" :indentSize="30">
        </el-tree-grid>
        <el-table-column prop="cat_level" label="级别" width="100">
            <template slot-scope="scope">
                <span v-if= "scope.row.cat_level===0">一级</span>
                <span v-else-if= "scope.row.cat_level===1">二级</span>
                <span v-else-if= "scope.row.cat_level===2">三级</span>
            </template>
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="140">
            <template slot-scope="scope">
                <span v-if= "scope.row.cat_deleted===false">有效</span>
                <span v-if= "scope.row.cat_deleted===true">无效</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="showEditBox(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="showDeleBox(scope.row.id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
const ElTreeGrid = require('element-tree-grid');
export default {
    components: {
        ElTreeGrid
    },
    data() {
        return {
            list: [],
            dialogFormVisibleAdd: false,
            formLabelWidth: '120px',
            form: {
                cat_pid: -1,
                cat_name: '',
                cat_level: -1
            },
            caslist:[],
            selectedOptions:[],
            defaultProp:{
              value:'cat_id',
              label:'cat_name',
              children:'children'
            }
        }
    },
    created() {
        this.loadTableData()
    },
    methods: {
        // 添加分类
       async showAddGoodDia() {
            this.dialogFormVisibleAdd = true
            // 获取两级的数据
            const res = await this.$http.get(`categories?type=2`)
           this.caslist = res.data.data
         },
        async loadTableData() {
            const res = await this.$http.get(`categories?type=3`)
            console.log(res)
            this.list = res.data.data
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
