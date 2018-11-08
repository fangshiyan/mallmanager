<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <img src="../assets/logo.png">
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <h2>电商后台管理系统</h2>
            </el-col>
            <el-col :span="1">
                <a href="#" class="loginout" @click="loginout()">退出</a>
            </el-col>
        </el-row>

    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu class="menu" :router="true" :unique-opened="true" default-active="">

                <el-submenu :index="index+''" v-for="(item1, index) in menus" :key="index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item1.authName}}</span>
                    </template>
                    <el-menu-item :index="'/'+item2.path" v-for="(item2, index) in item1.children" :key="index">
                        <i class="el-icon-menu"></i>
                        {{item2.authName}}</el-menu-item>

                </el-submenu>
                
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return{
            menus:[]
        }
    },

    // beforeCreate() {
    //     const token = sessionStorage.getItem('token')

    //     if (!token) {
    //         this.$router.push('/login')
    //         this.$message.warning('请先登录')
    //     } else {
    //         this.$message.warning('进入到Home页')
    //         this.$router.push('/')
    //     }
    // },
    created(){
        this.getMenus()
    },
    methods:{
        //获取动态菜单
        async getMenus(){
            const res = await this.$http.get(`menus`)
            // console.log(res)
            this.menus = res.data.data
        },
        loginout(){
            //清除session
            sessionStorage.clear()
            //跳转
            this.$router.push({name:'login'})
            //提示
            this.$message.success('退出成功')
        }
    }

}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
}

/* 头部样式 */
.header .middle {
    line-height: 60px;
    color: #fff;
    text-align: center;
}

.header .loginout {
    line-height: 60px;
    text-decoration: none;
}

.menu {
    height: 1005px;
}
</style>
