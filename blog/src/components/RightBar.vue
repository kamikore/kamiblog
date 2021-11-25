<template>
  <div class="right-bar">
    <span
      class="turnUp iconfont icon-qiehuan5"
      id="turn"
      @click="rotate"
    ></span>
    <div class="users-container">
      <div class="blogger-wrap front" v-if="isblogger">
        <!-- 用户自定义皮肤图片 -->
        <div class="avatar-top">
          <img src="@assets/headerbackground.jpg" alt="" />
          <span class="username">Kamikore </span>
        </div>

        <!-- 本人我的头像 -->
        <div class="avatar">
          <img src="@assets/test.jpg" alt="" />
        </div>

        <!-- 显示用户信息，个性化内容... -->
        <div class="avatar-foot">
          <!-- 本人我的具体信息 -->
          <div class="info">
            <div class="school-info">
              <div>信息安全</div>
              <div>2018-2022 学生</div>
            </div>
            <div class="person-info">
              <div class="region iconfont icon-local">广东 - 中山</div>
              <span> email</span>
            </div>
            <div>前端 vue + element</div>
            <div>后台 vue + element</div>
            <div>后端 node + mysql + express</div>
            <div class="contact">联系方式</div>
          </div>

          <div class="info">吧啦吧啦吧啦 说一堆-----</div>
        </div>
      </div>

      <div class="user-wrap back" v-else>
        <div class="avatar-top">
          <img src="@assets/headerbackground.jpg" alt="" />
          <span class="username"
            >{{ this.$store.state.userInfo.username || "游客" }}
          </span>
        </div>

        <div class="avatar">
          <img
            :src="
              this.$store.state.userInfo.avatar ||
              'http://localhost:3000/images/avatar.png'
            "
            alt=""
          />
        </div>

        <div class="avatar-foot">
          <div class="info">
            <div class="school-info">
              <div>信息安全</div>
              <div>2018-2022 学生</div>
            </div>
            <div class="person-info">
              <div class="region iconfont icon-local">广东 - 中山</div>
              <span> email</span>
            </div>
            <div>前端 vue + element</div>
            <div>后台 vue + element</div>
            <div>后端 node + mysql + express</div>
            <div class="contact">联系方式</div>
          </div>
          <!-- 游客信息，设有默认提示内容 -->
          <div class="info">您没有写下内容，可以到菜单中完善信息-----</div>
        </div>
      </div>
    </div>
    <!-- 文章标签云 -->
    <div class="tags-container">
      <div class="title"></div>
      <div class="tags-wrap">
        <div class="item">
          <span>tags</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let degree = 0;
export default {
  data() {
    return {
      isblogger: true,
    };
  },
  methods: {
    rotate() {
      if (!this.$store.state.loginStatus) {
        this.$message.warning("请先登录 ！！！");
        return;
      }
      degree = (degree + 180) % 360;
      const turn = document.getElementById("turn");
      turn.style.visibility = "hidden";
      turn.style.transition = "all 0s";
      document.getElementsByClassName("users-container")[0].style.transform =
        "rotateY(" + degree + "deg)";

      // 只能用刚好翻转到一半的时间完成效果，是否有更好的效果
      setTimeout(() => {
        this.isblogger = !this.isblogger;
      }, 500);
      setTimeout(() => {
        turn.style.visibility = "visible";
        turn.style.transition = "all 0.3s linear";
      }, 1000);
    },
  },
};
</script>


<style lang='less' socped>
.right-bar:hover {
  .turnUp {
    // animation: move 0.3s forwards;
    transform: translateX(0);
  }
}

.right-bar {
  position: absolute;
  margin-top: 100px;
  width: 21%;
  right: 8%;
  transition: all 1s linear;

  .turnUp {
    height: 40px;
    position: absolute;
    left: 100%;
    top: 3%;
    transform: translateX(-110%);
    transition: all 0.3s linear;
    background: #f5f5f5;
    font-size: 30px;
    padding: 5px;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0 0 3px rgb(70, 67, 67);
  }

  .users-container {
    width: 100%;
    transition: all 1s linear;
    transform-style: preserve-3d;

    .front {
      // position: absolute;
      transition: all 1s linear;
      z-index: 1;
    }

    .back {
      // position: absolute;
      transform: rotateY(180deg);
      transition: all 1s linear;
    }

    .blogger-wrap,
    .user-wrap {
      width: 100%;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 5px rgb(70, 67, 67);

      .avatar-top {
        width: 100%;
        height: 130px;
        position: relative;
        overflow: hidden;
        // box-shadow: 0 5px 5px rgb(60, 67, 67);

        img {
          width: 100%;
        }

        .username {
          position: absolute;
          top: 50%;
          left: 55%;
          width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 25px;
          color: #fffafa;
        }
      }

      .avatar {
        width: 100px;
        height: 100px;
        position: absolute;
        display: flex;
        align-items: center;
        left: 30px;
        top: 55px;
        border-radius: 50%;
        box-shadow: 0 0 10px rgb(70, 67, 67);
        overflow: hidden;
        background: #fff;

        img {
          width: 100px;
        }
      }
      .avatar-foot {
        // width: 100%;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 10px 10px 10px;

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          gap: 10px;
          color: #32325d;
          font-weight: bold;
        }
      }
    }
  }

  .tags-container {
    width: 100%;
    margin-top: 50px;
    background: chocolate;
    border-radius: 10px;
    box-shadow: 0 0 5px rgb(70, 67, 67);

    .item {
      width: 100%;
      height: 200px;
    }
  }
}

// html 默认字体大小是 16px
@media screen and (max-width: 71em) {
  .right-bar {
    display: none;
  }
}

// 响应式处理
</style>