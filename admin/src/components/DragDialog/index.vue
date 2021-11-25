<template>
  <div class="dragDialog_wrap">
    <div class="dragDialog">
      <div class="header" @mousedown="drag($event, 'dragDialog')">
        <span>修改头像</span>
        <span class="iconfont icon-close" @click="handleClose"></span>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="clip_box">
            <div class="container_bg">
              <div class="img_container">
                <img src="" alt="" ref="clip_img" />
              </div>
            </div>
            <button
              class="iconfont icon-qiehuan2"
              v-show="!visible"
              @click="select"
            >
              重新选择
            </button>
            <label class="file_input" v-show="visible" @click="select">
              <i></i>
              <span>选择图片</span>
            </label>
            <input
              type="file"
              ref="file_input"
              style="display: none"
              accept="image/png,image/jpg,image/jpeg"
            />
          </div>
        </div>
        <div class="content_right">
          <div class="preview_box">
            <div class="container_pre">
              <img src="" alt="" ref="pre_img" />
            </div>
            <div class="pre_info">预览头像</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <button>取消</button>
        <button @click="upload">上传并保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { drag } from "@/utils/drag";
import { uploadAvatar } from "@/api/user";

export default {
  props: ["userId"],
  data() {
    return {
      imgFile: "",
      imgType: "",
      visible: true,
    };
  },
  methods: {
    drag(event, element) {
      drag(event, element);
    },
    select() {
      this.$refs.file_input.click();
    },
    upload() {
      if (!this.imgFile) {
        this.$message.warning("请选择图片");
        return;
      }
      this.$loading({ fullscreen: true });
      //把base64 编码的文件发送
      uploadAvatar({ imgFile: this.imgFile, type: this.imgType })
        .then((res) => {
          this.$store.dispatch("user/uploadAvatar", res.url);
          this.$emit("close");
          this.$loading().close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClose() {
      this.$emit("close");
      this.visible = false;
    },
  },
  mounted() {
    let reader = new FileReader();
    // img 元素实例
    let image = new Image();
    let clip_img = this.$refs.clip_img;
    let pre_img = this.$refs.pre_img;

    //监听文件选择，并转换为 base64
    this.$refs.file_input.addEventListener("change", () => {
      this.visible ? (this.visible = !this.visible) : "";
      this.imgFile = this.$refs.file_input.files[0];
      console.log(this.imgFile);
      this.imgType = this.imgFile.type.split("/")[1];

      reader.readAsDataURL(this.imgFile); //异步
      reader.onload = () => {
        image.src = reader.result;
        this.imgFile = reader.result;
        image.onload = () => {
          if (image.width > 250) {
            clip_img.style.width = "250px";
            pre_img.style.width = "150px";
          } else if (image.height > 250) {
            clip_img.style.height = "250px";
            pre_img.style.height = "150px";
          }
        };

        clip_img.src = reader.result;
        pre_img.src = reader.result;
      };
    });
  },
};
</script>

<style lang="scss" scoped>
$font: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto,
  Noto, Helvetica Neue, sans-serif !important;

.dragDialog_wrap {
  width: 100%;
  height: 100%;
  display: block;
  position: fixed;
  // background-color: rgba(0, 0, 0, 0.65);
  top: 0;
  bottom: 0;
  // left: 0;
  // right: 0;
  z-index: 1000;

  .dragDialog {
    @extend .dragDialog_wrap;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 500px;
    width: 800px;
    // margin: auto;
    padding: 20px 40px;
    background: #fff;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);

    .header {
      display: flex;
      justify-content: space-between;
      height: 30px;
      cursor: move;

      span {
        font-size: 16px;
        color: #778899;
        font-weight: bold;
        user-select: none;

        &:last-child {
          width: 40px;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .content {
      display: flex;
      justify-content: center;
      flex: 1;

      .content_left {
        width: 40%;
        background: #778899;
        padding: 40px 0;

        .clip_box {
          position: relative;
          border-right: 1px solid #c0c0c0;

          .container_bg {
            width: 250px;
            height: 250px;
            background-color: #000;
            border-radius: 4px;
            border: 1px solid #e5e9ef;

            img {
              position: relative;
            }
          }

          label {
            width: 250px;
            height: 250px;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            background: #f1f2f5;
          }
        }
      }

      .content_right {
        width: 40%;
        background: aquamarine;
        padding: 80px 10px;

        .preview_box {
          position: relative;
          text-align: center;

          .content_pre {
            width: 150px;
            height: 150px;

            img {
              position: relative;
            }
          }
        }
      }
    }
    .footer {
      text-align: right;
      padding-right: 100px;
      height: 40px;

      button {
        height: 2.5rem;
        margin-left: 40px;
        border: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        padding: 0 10px;
        cursor: pointer;
        font-family: $font;

        &:first-child {
          background: #e0e0e0;
          font-weight: 500;
        }

        &:last-child {
          background: #db4d6d;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
}
</style>