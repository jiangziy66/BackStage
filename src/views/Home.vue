<template>
  <div class="home">
    <!-- 上边固定 下边自适应 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div class="home-slogn">
          <img src="../assets/images/heima.png" alt />
          <span>后台管理系统</span>
        </div>
        <el-button type="info" @click="loginout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!-- 切换按钮 -->
          <div class="toggle-auto" @click="isCollapse = !isCollapse">|||</div>
          <!-- 导航栏 -->
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#AFEEEE"
            text-color="#B22222"
            unique-opened
            router
            :collapse="isCollapse"
            :collapse-transition = 'false'
            active-text-color="#409eff"
          >
            <el-submenu :index="submenu.path" v-for="submenu in menuList" :key="submenu.id">
              <!-- 一级导航 -->
              <template slot="title">
                <!-- 一级导航前的图标 -->
                <!-- <i class="el-icon-location"></i> -->
                <!-- <i :class="navIconObj['101']"></i> -->
                <i :class="navIconObj[submenu.id]"></i>
                <!-- 一级导航的文字 -->
                <span>{{submenu.authName}}</span>
              </template>
              <!-- 这是二级导航 -->
              <!-- 遍历一级导航的children属性渲染二级导航 -->
              <el-menu-item @click="saveActive(item.path)" :index="item.path" v-for="item in submenu.children" :key="item.id">
                <!-- {{item.authName}} -->
                <template slot="title">
                  <!-- 二级导航前的图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 二级导航的文字 -->
                  <span>{{item.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧区域 -->
        <el-main>
            <!-- 二级路由占位符 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 1.定义获取数据的方法
// 2.在页面加载的时候调用这个方法
// 3.将获取到数据给data中
// 4.使用vue的语法对数据进行渲染
export default {
  data() {
    return {
      menuList: [],
      navIconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      defaultActive: '/users'
    };
  },
  created() {
    this.getMenuList();
    // 从本地去除上一次存储到本地的默认高亮
    this.defaultActive = sessionStorage.getItem('defaultActive')
  },
  methods: {
    loginout() {
      // 退出功能
      // 1.清除本地存储token信息
      // 2.路由跳转到登录界面
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
    /* //   console.log(key, keyPath);
    this.defaultActive = keyPath[0]
    // 存储到本地中
    sessionStorage.setItem('defaultActive',keyPath[0]) */
    this.saveActive(keyPath[0])
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuList() {
      // 获取本地存储token
      // const tokenStr = localStorage.getItem("token");
      /* const { data: res } = await this.$http.get("menus", {
        headers: { Authorization: tokenStr }
      }); */
      // console.log(res)
      /* if (res.meta.status !== 200)
        return this.$message.error(res.meta.msg || "接口无效");
      this.menuList = res.data; */
      
      this.$http.get('menus')
        .then(res => {
          const { data: result } = res // {data: {}}
          // if (result.meta.status !== 200) return this.$message.error(result.meta.msg || '接口无效')
          this.menuList = result.data
        })
    },
    saveActive (path) {
      this.defaultActive = path
      // 存储到本地中
      sessionStorage.setItem('defaultActive',path)
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .el-container {
    height: 100vh;
  }
  .el-header {
    background-color: skyblue;
    display: flex;
    justify-content: space-between;
    .el-button {
      height: 40px;
      margin-top: 10px;
    }
  }
  .el-aside {
    background-color: #afeeee;
    .el-menu {
      border: none;
      .iconfont {
          margin-right: 8px;
      }
    }
    .toggle-auto {
        text-align: center;
        color: #ADFF2F;
        background-color: #BDB76B;
        cursor: pointer;
    }
  }
  .el-main {
    background-color: #faebd7;
  }
  .home-slogn {
    display: flex;
    justify-self: center;
    align-items: center;
    span {
      color: #ff4500;
      font-size: 18px;
      margin-left: 14px;
    }
  }
}
</style>
