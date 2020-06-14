<template>
  <div class="login">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <el-button type="primary">主要按钮</el-button> -->
    <div class="login-box">
      <!-- 头像区域 -->
      <img class="login-box-avatar" src="../assets/logo.png" alt />
      <!-- 表单区域 -->
      <el-form ref="form" :model="loginForm" :rules="rules" label-width="0px" size="mini">
        <el-form-item prop="username">
          <!-- <el-input prefix-icon="el-icon-user-solid"></el-input>  -->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- <el-input prefix-icon="el-icon-lock"></el-input> -->
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-lock_fill" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm('form')">登录</el-button>
          <el-button type="info" size="medium" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证通过 调取登录接口
          // this.$http就会去Vue.prototype上找$http
          // 1.获取文本框中的用户名和密码
          // 2.发送请求
          // 3.对响应结果进行判断
          // console.log(this.loginForm);
          const { data: result } = await this.$http.post("login", this.loginForm)
            // console.log(res.data)
            // 从对象中结构出data属性 并命名为result
            if (result.meta.status !== 200) return this.$message.error(result.meta.msg || "账号或密码错误");
            //token作为登录成功一个标识 我们一个把token存储起来 localStorage sessionStorage cookie
            localStorage.setItem('token', result.data.token)
            // 简写 return this.$message.success(result.meta.msg || '登录成功！')
            this.$message({
              message: result.meta.msg || '登录成功了！',
              type: 'success'
            })
            //跳转到后台管理页面
            this.$router.push('/home') 
        } else {
          // 校验失败
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      // 重置表单
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
// 定位
.login {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  position: relative;
  &-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-avatar {
      height: 130px;
      width: 130px;
      border-radius: 50%;
      border: 10px solid #fff;
      background-color: #fff;
      position: absolute;
      left: 50%;
      // top:0;
      transform: translate(-50%, -50%);
      box-shadow: 0px 0px 10px #ddd;
    }
    /deep/ .el-input__inner {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      color: #606266;
      font-size: 16px;
      padding: 0 35px;
    }
    /deep/ .el-input__icon {
      font-size: 18px;
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
