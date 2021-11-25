<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" v-loading="loading">
      <div class="avatar" @click="changeAvatar">
        <el-image style="width: 150px; height: 150px" :src="userInfo.avatar">
        </el-image>
        <div class="avatar_hover">
          <span class="iconfont icon-qiehuan2">更换头像</span>
        </div>
      </div>
      <el-form-item label="用户昵称">
        <el-input v-model="form.username" style="width: 20%" />
      </el-form-item>
      <el-form-item label="所在地区">
        <el-select
          v-model="form.province"
          :placeholder="form.province ? '' : userInfo.area[0]"
        >
          <el-option label="广东" value="广东" />
          <el-option label="湖北" value="湖北" />
        </el-select>
        <el-select
          v-model="form.city"
          :placeholder="form.city ? '' : userInfo.area[1]"
          style="padding-left: 30px"
        >
          <el-option label="中山" value="中山" />
          <el-option label="武汉" value="武汉" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            :placeholder="form.birthday ? '' : '未选择'"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="type">
        <el-switch v-model="form.delivery" />
      </el-form-item> -->
      <!-- <el-form-item label="兴趣标签">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item label="个人简介">
        <el-input
          v-model="form.intro"
          type="textarea"
          rows="3"
          maxlength="50"
          show-word-limit
          style="width: 50%"
          :placeholder="form.intro ? '' : '未设置'"
        />
      </el-form-item>
      <el-form-item>
        <!-- <el-button @click="onCancel">取消</el-button> -->
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
    <DragDialog v-show="visible" @close="visible = false"></DragDialog>
  </div>
</template>

<script>
import DragDialog from "@/components/DragDialog";
import { mapGetters } from "vuex";
import { updateInfo } from "@/api/user";

export default {
  components: {
    DragDialog,
  },
  data() {
    return {
      form: {
        username: "",
        avatar: "",
        province: "",
        city: "",
        date: "",
        // delivery: false,
        // type: [],
        gender: "",
        intro: "",
      },
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    onSubmit() {
      this.loading = true;
      updateInfo(this.form)
        .then((res) => {
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    changeAvatar() {
      this.visible = !this.visible;
      const dragDialog = document.querySelector(".dragDialog");
      dragDialog.style.left = "50px";
      dragDialog.style.top = "50px";
    },
  },
  created() {
    this.form = this.userInfo;
    this.url = this.userInfo.avatar;
    // this.form.province = this.userInfo.area[0];
    // this.form.city = this.userInfo.area[1];
  },
  mounted() {
    document.onkeyup = (e) => {
      if (this.visible) {
        switch (e.code) {
          case "Enter":
            break;
          case "Escape":
            this.visible = false;
            break;
        }
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  position: relative;

  .avatar {
    position: absolute;
    height: 150px;
    width: 150px;
    top: 5%;
    right: 5%;
    cursor: pointer;
    z-index: 999;

    &:hover .avatar_hover {
      visibility: visible;
    }

    .avatar_hover {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background: rgb(0, 0, 0, 0.4);
      visibility: hidden;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        font-weight: bold;
        font-size: 20px;
        color: #e2e3e2;
      }
    }

    .el-image {
      border-radius: 50%;
    }
  }
}
</style>



