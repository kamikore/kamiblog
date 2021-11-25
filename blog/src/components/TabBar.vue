<template>
  <!-- 套一层div，占位置，避免fixed 脱标影响后续布局，很麻烦 -->
  <div class="placeholder">
    <div class="tab-bar">
      <div class="tab-wrap">
        <div class="left">
          <div class="left-content" @click="goto">
            <span class="left-name">kami</span>
            <span class="left-blog">blog</span>
          </div>
        </div>
        <div class="middle">
          <!-- 后续会通过 key index 值识别点击哪个item -->
          <div
            class="item"
            v-for="(item, index) in itemList"
            @click="itemClick(index)"
            :key="index"
          >
            <div class="middle-box">
              <span class="iconfont" :class="item.icon"></span>
              <span class="item-text"> {{ item.text }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <!-- 移动端？？？ -->
          <div class="search">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="搜索本站"
              suffix-icon="el-icon-search"
              @select="handleSelect"
            ></el-autocomplete>
          </div>

          <span
            class="right-login"
            @click="login"
            v-if="!this.$store.state.loginStatus"
            >登录</span
          >
          <div class="right-login" v-else>
            <span class="username">{{
              this.$store.state.userInfo
                ? this.$store.state.userInfo.username
                : ""
            }}</span>
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                <i class="iconfont icon-menu"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="0">修改个人信息</el-dropdown-item>
                  <el-dropdown-item command="1">个人设置</el-dropdown-item>
                  <el-dropdown-item command="2">
                    <a target="_blank" href="http://localhost:8000">后台管理</a>
                  </el-dropdown-item>
                  <el-dropdown-item command="3">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="home">
          <div class="aaa"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入 vue 3.0
import { defineComponent, ref, onMounted } from "vue";
// 引入mitt
import emitter from "../eventbus";
// console.log("引入内容", emitter);

export default defineComponent({
  name: "TabBar",
  data() {
    return {
      // 用户名使用计算属性获取，避免多次执行
      // 冻结数组，以提高性能
      itemList: Object.freeze([
        { text: "首页", icon: "icon-home", path: "/home" },
        { text: "归档", icon: "icon-file-common", path: "/file" },
        { text: "友联", icon: "icon-link", path: "/friend" },
        { text: "留言", icon: "icon-comment", path: "/comment" },
        { text: "发表", icon: "icon-edit", path: "/edit" },
        { text: "关于", icon: "icon-pin", path: "/about" },
      ]),

      // elementplus 搜索组件
      restaurants: [],
      state: "",
      timeout: null,
    };
  },
  mounted() {
    let tab_bar = document.getElementsByClassName("tab-bar")[0];

    // 只是拿到了搜索弹窗
    let elSearch = document.getElementsByClassName(
      "el-autocomplete__popper"
    )[0];

    // 通过 eventbus 连接 backtop 的监听滚动，触发事件
    emitter.on("opc0", () => {
      tab_bar.classList.add("top-nav-collapse");
      // 仅单纯改变透明度，整个tabbar仍然可以选中点击
      //tab_bar.style.opacity = 0.5;
      //tab_bar.style.visibility = "hidden";
      // 搜索框的弹窗也需要隐藏
      elSearch.style.display = "none";
    });
    emitter.on("opc1", () => {
      tab_bar.classList.remove("top-nav-collapse");
      // tab_bar.style.opacity = 1;
      // tab_bar.style.visibility = "visible";
      // tab_bar.style.background = "#fff";
      elSearch.style.display = "";
    });
  },

  methods: {
    goto() {
      this.$router.push("/home");
    },
    login() {
      // 判断登录框是否已经显示, 用getters 不合适不修改
      if (!this.$store.state.showLogin) {
        this.$store.dispatch("change_showLogin", true).then((res) => {});
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$loading({ fullscreen: true });
      this.$store.dispatch("change_userInfo", null);
      this.$store.dispatch("change_login", false).then((res) => {
        this.$message.success("已登出");
        console.log("登录状态：", res);
        this.$loading().close();
      });
    },

    // tabbar 选项事件
    itemClick(index) {
      this.$router.push(this.itemList[index].path);
      // switch (index) {
      //   case 0:
      //     this.$router.push(this.itemList[index].path);
      //     break;
      //   case 1:
      //     this.$router.push(this.itemList[index].path);
      //     break;
      //   case 2:
      //     this.$router.push(this.itemList[index].path);
      //     break;
      // }
    },
    // elementUI 下拉菜单的点击事件处理
    handleCommand(command) {
      switch (command) {
        case "2":
          break;
        case "3":
          this.logout();
          break;
      }
    },
  },

  // elementplus 搜索框插件配置
  setup() {
    const restaurants = ref([]);
    const loadAll = () => {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
      ];
    };
    let timeout;
    const querySearchAsync = (queryString, cb) => {
      var results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    };
    const createFilter = (queryString) => {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    };
    const handleSelect = (item) => {
      console.log(item);
    };
    onMounted(() => {
      restaurants.value = loadAll();
    });
    return {
      restaurants,
      state: ref(""),
      querySearchAsync,
      createFilter,
      loadAll,
      handleSelect,
    };
  },
});
</script>

<style lang='less' scoped>
// 滚动事件触发的隐藏样式, 加了scoped 使用 :deep( 选择器 )
div .top-nav-collapse {
  height: 60px;
  line-height: 60px;
  background: rgba(47, 65, 84, 0.5);
  backdrop-filter: blur(3px);

  :deep(.el-input__inner) {
    transition: all 0.5s ease-in-out;
    background: rgba(47, 65, 84, 0.5);
  }
}

// 占位置的
// .placeholder {
//   height: 75px;
//   line-height: 75px;
// }

a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

// PC样式
.home {
  display: none;
}

.tab-bar {
  transition: all 0.5s ease-in-out;
  height: 75px;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  background-color: transparent;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 999;
}

.tab-wrap {
  height: 100%;
  display: flex;
}

.left {
  flex: 1.3;
  display: flex;
  align-items: center;
  // 靠右对齐
  justify-content: flex-end;
}

.left-content {
  display: flex;
  cursor: pointer;
}

.left-name {
  font-size: 30px;
  font-weight: 700;
  background: linear-gradient(-225deg, #2cd8d5, #c5c1ff 56%, #ffbac3);
  // background-clip 属性规定背景的绘制区域。
  -webkit-background-clip: text;
  //设置文字颜色透明，否则绘制的会被挡住  ，  固定搭配
  color: transparent;
}

.left-blog {
  font-size: 18px;
  font-weight: bold;
  color: #828282;
  margin-top: -5px;
}

.left-content:hover .left-name,
.left-content:hover .left-blog {
  color: #dcdcdc;
  transition: all 0.2s linear;
}

.middle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  flex: 3.5;
  /* 用于移动端自适应 */
  min-width: 440px;
}

.middle .item {
  display: flex;
  margin-left: 27px;
  color: #fff;
  font-weight: bold;
  height: 100%;
  align-items: center;
  position: relative;
  cursor: pointer;
}

// 选中item 项的下边框
.middle .item:after {
  content: "";
  position: absolute;
  border-bottom: 1.5px solid #4bbeff;
  width: 0;
  //居中，下移使边框从中间向两边展开, 在content 中添加内容更直观看见效果
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: -1px;
  transition: all 0.3s linear;
}

.middle .item:hover:after {
  transition: all 0.2s linear;
  width: 100%;
}

.middle .item:hover {
  color: #4bbeff;
}

.right {
  display: flex;
  align-items: center;
  flex: 3;

  .search {
    width: 50%;
  }

  .right-login {
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // 都使用百分比，line-height 无法使文字垂直居中
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    // vertical-align: middle;
    margin-left: 100px;
    width: 20%;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    color: #cc3563;
    text-align: center;

    .username {
      display: inline-block;
      color: #2cd8d5;
      font-size: 20px;
    }
  }

  .icon-menu {
    font-size: 30px;
  }
}

// 移动端样式
@media not screen and (min-width: 45em) {
  .bbb :deep(.el-input) {
    width: 110px;
  }

  .aaa {
    text-align: left;
  }

  .aaa :deep(.el-dropdown) {
    width: 70px;
    margin-left: -18px;
    text-align: left;
  }

  .tab-bar {
    z-index: 999;
    height: 50px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }

  .left-name {
    font-size: 17px;
    font-weight: 700;
    color: #292929;
  }

  .left-blog {
    margin-right: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #828282;
    margin-top: -5px;
  }

  .middle {
    background-color: #828282;
    display: none;
  }

  .right {
    justify-content: space-around;

    .right-login {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      width: 75px;
      max-width: 75px;
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .home {
    display: block;
  }
}
</style>