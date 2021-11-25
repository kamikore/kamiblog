<template>
  <div class="login-register">
    <div class="container">
      <!-- 单向绑定 active 判断登录 / 注册状态 -->
      <!-- 如果isLogin 为true ，就加上 active 这个类, 通过active 实现滑动 -->
      <div class="big-box" :class="{ active: isLogin }">
        <!-- 关闭按钮 -->
        <span
          class="iconfont icon-sign-out close-button"
          :class="{ islogin: isLogin }"
          @click="() => this.$store.dispatch('change_showLogin', false)"
        ></span>
        <!-- 正体表单内容 -->
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="loginForm"
            class="form"
          >
            <el-form-item prop="email">
              <el-input
                type="email"
                placeholder="请输入邮箱"
                v-model="form.email"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="form.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 这里需要十分注意 传参需要以字符串形式，否则会validate 未定义 -->
              <el-button
                type="primary"
                :loading="loading"
                @click="login('loginForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <!-- 注意 label-width 会影响item-content 有个margin-left 为label 腾出空间 -->
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="registerForm"
            class="form"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                v-model="form.username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="form.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                placeholder="请再次确认密码"
                v-model="form.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                type="email"
                placeholder="请输入邮箱"
                v-model="form.email"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <!-- 这里需要十分注意 传参需要以字符串形式，否则会validate 未定义 -->
              <el-button
                type="primary"
                :loading="loading"
                @click="register('registerForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 侧边栏内容 -->
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (
        this.form.pass.includes("'") ||
        this.form.pass.includes('"') ||
        this.form.pass.includes(" ")
      ) {
        this.form.pass = "";
        this.loading = false;
        callback(new Error("密码不能带有空格，引号！！！"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value === "") {
        callback(new Error("请输入用户邮箱"));
      } else if (!mailReg.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不能少于6位字符"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 当前的登录框状态，默认为登录
      isLogin: true,
      // 按钮状态
      loading: false,
      form: {
        username: "",
        email: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    // 切换登录 / 注册状态
    changeType() {
      this.isLogin = !this.isLogin;
      // 每次切换把表单清空
      this.form.username = "";
      this.form.email = "";
      this.form.pass = "";
      this.form.checkPass = "";
    },
    login(formName) {
      this.loading = true;

      // 仔细的信息校验交由服务器插件处理，前端判空就好
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$loading({ fullscreen: true });
          // 发起请求 , 以防万一还是catch 一下，消息还是由拦截器输出
          this.$api.user
            .loginRequest({
              email: this.form.email,
              password: this.form.pass,
            })
            .then((res) => {
              this.$message.success("登录成功！！！");
              this.form = "";
              localStorage.setItem("token", res.data.token);
              this.$loading().close();
              this.$api.user.getUser(res.data._id).then((res) => {
                this.$store
                  .dispatch("change_userInfo", res.data.data)
                  .then(() => {
                    this.$store.dispatch("change_login", true).then((res) => {
                      this.$loading().close();
                      this.loading = false;
                      this.$store.dispatch("change_showLogin", false);
                    });
                  });
              });
            })
            .catch((err) => {
              this.$loading().close();
              this.loading = false;
              return false;
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    // 注册 发送请求让后台对信息经行验证
    register(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$loading({ fullscreen: true });
          this.loading = false;

          // 发起请求
          this.$api.user.registerRequest({
            username: this.form.username,
            email: this.form.email,
            password: this.form.pass,
          })
            .then((res) => {
              this.form = "";
              this.$message.success("注册成功 ！！！");
              this.changeType();
              this.loading = false;
              this.$loading().close();
            })
            .catch((err) => {
              this.$loading().close();
              this.loading = false;
              return false;
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
  },

  mounted() {
    //按键事件监听
    this.$nextTick(() => {
      document.onkeyup = (e) => {
        if (this.$store.state.showLogin) {
          switch (e.code) {
            case "Enter":
              this.isLogin
                ? this.login("loginForm")
                : this.register("registerForm");
              break;
            case "Escape":
              this.$store.dispatch("change_showLogin", false);
              break;
          }
        }
      };
    });
  },
};
</script>
    
<style lang='less' scoped>
.login-register {
  /* 获取viewport 100% 的宽度高度  使得框体大小根据视口调整 */
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  z-index: 9;

  //框体容器
  .container {
    /* 以视口的 60% 宽高作为容器 */
    width: 60%;
    height: 60%;
    min-height: 400px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background-color: black;
    border-radius: 20px;
    box-shadow: 0 0 10px rgb(70, 67, 67);

    // 外层的
    .big-box.active {
      left: 0;
      transition: all 0.5s;
    }

    .small-box.active {
      left: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      // 把侧边栏突出来的地方缩回去
      transform: translateX(-100%);
      transition: all 1s;
    }

    /* 正体表单内容 */
    .big-box {
      width: 70%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 30%;
      transform: translateX(0%);
      transition: all 1s;

      .icon-sign-out {
        position: relative;
        // 相对原来的位置的左边距
        left: 45%;
        top: 4%;
        font-size: 150%;
        color: #98c5fc;
        cursor: pointer;
      }

      .icon-sign-out.islogin {
        left: -45%;
      }
    }
    .big-contain {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .btitle {
      font-size: 1.5em;
      font-weight: bold;
      color: rgb(152, 197, 252);
    }
    .form {
      width: 100%;
      padding: 2em 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      // 高度最好都是自适应，可能会影响很多布局，包括错误信息
      .el-form-item {
        width: 50%;

        .el-button {
          width: 50%;
          height: 40px;
          border-radius: 24px;
          border: none;
          outline: none;
          background-color: #98c5fc;
          color: #fff;
          font-size: 0.9em;
          cursor: pointer;
        }
      }
    }
  }

  /* 侧边栏内容 */
  .small-box {
    width: 30%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(0, 0, 0, 0.15) 100%
      ),
      radial-gradient(
          at top center,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(0, 0, 0, 0.4) 120%
        )
        #989898;
    background-blend-mode: multiply, multiply;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%);
    transition: all 1s;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;

    .small-contain {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .stitle {
      font-size: 1.5em;
      font-weight: bold;
      color: #fff;
    }
    .scontent {
      font-size: 0.8em;
      color: #fff;
      text-align: center;
      padding: 2em 4em;
      line-height: 1.7em;
    }
    .sbutton {
      width: 60%;
      height: 40px;
      border-radius: 24px;
      border: 1px solid #fff;
      outline: none;
      background-color: transparent;
      color: #fff;
      font-size: 0.9em;
      cursor: pointer;
    }
  }
}
</style>