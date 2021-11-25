<template>
  <div class="app-container">
    {{ str }}
    {{ list }}
    <button @click="handleDelete()">点击</button>
  </div>
</template>

<script>
import { manageArticle, deleteArticle } from "@/api/article";
import { convertTime } from "@/utils/date";

export default {
  data() {
    return {
      list: [
        { index: 1, data: "ben" },
        { index: 2, data: "tony" },
        { index: 3, data: "jenny" },
      ],
      str: "sdsd",
      listLoading: true,
      dialogVisible: false,
    };
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true;
    //   manageArticle().then((response) => {
    //     console.log(response);
    //     this.list = response.data;
    //     this.listLoading = false;
    //   });
    // },
    statusComputed(status) {
      const statusMap = {
        published: "success",
        draft: "",
        deleted: "danger",
      };
      return statusMap[status];
    },
    handleDelete() {
      // this.list.push({ index: 5, data: "gogo" });
      // this.list[3] = "sds";
      // this.list[1] = "emty";
      this.$set(this.list, 1, "sdsd");
      // this.list.splice(1, 1);

      console.log(this.list);
      // this.str = "12324";
    },
    handleClose() {},
    convertTime(date) {
      return convertTime(new Date(date));
    },
  },
  beforeUpdate() {
    console.log("beforeUpdate !!!");
  },
  updated() {
    console.log("updated !!!");
  },
};
</script>
