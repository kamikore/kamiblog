<template>
  <div id="app">
    <login-register v-show="this.$store.state.showLogin"></login-register>
    <tab-bar></tab-bar>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <router-view name="editor"></router-view>
    <back-top></back-top>
  </div>
</template>

<script>
import TabBar from "./components/TabBar.vue";
import Login from "./components/Login.vue";
import BackTop from "@/components/BackTop.vue";
// import Test from "./views/testmarkdown.vue";
import { verifyToken, getUser } from "./api/user";

export default {
  name: "App",
  components: {
    TabBar,
    BackTop,
    // "tab-bar": () => import("./components/TabBar.vue"),
    "login-register": Login,
  },
  data() {
    return {
      transitionName: "slide-right",
    };
  },
  created() {},
  mounted() {
    console.log(
      "%cWelcome To kamikore!",
      "background:black;color:#bada55;font-size:25px"
    );
    console.log(
      "%cVersion 1.0",
      "background:black;color:#bada55;font-size:20px"
    );
    console.log(
      "%c你的到来,是我的荣幸",
      "background:black;color:#bada55;font-size:17px"
    );
  },
};
</script>

<style lang="less">
html {
  scroll-behavior: smooth;
  // background: rgb(245, 248, 249);
  background: #242428;

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }

  body {
    margin: 0;
  }

  // 修改滚动条的样式
  body::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #16262d;
    background-image: -webkit-linear-gradient(
      45deg,
      hsla(0, 0%, 100%, 0.2) 25%,
      transparent 0,
      transparent 50%,
      hsla(0, 0%, 100%, 0.2) 0,
      hsla(0, 0%, 100%, 0.2) 75%,
      transparent 0,
      transparent
    );
  }

  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c4858;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
