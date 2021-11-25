<template>
  <div class="app-container">
    <!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- label 是表头标题 -->
      <el-table-column align="center" label="ID" width="95">
        <!-- slot-scop 的作用域插槽语法，自2.6.0 起弃用   -->
        <!-- element 组件中留有作用域插槽，用户通过插槽设置element组件中的属性，让element组件处理显示 -->
        <template v-slot="scope">
          <!-- 通过 Scoped slot 可以获取到 row（整行数据）, column, $index(当前项索引) 和 store（table 内部的状态管理）的数据 ,可以作为事件参数被获取输出-->
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Tags">
        <template slot-scope="scope">
          {{ scope.row.tags.join(" ，") }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.view }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="statusComputed(scope.row.status)">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Publish_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ convertTime(scope.row.publishTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleUpdate(scope.row._id)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            @click="dialogVisible = true"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row._id, scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 文本编辑 抽屉 -->
    <el-drawer
      title="文章编辑"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="90%"
    >
      <editor :id="articleId" @update-article="getNewList"></editor>
    </el-drawer>
  </div>
</template>

<script>
import { personalArticle, deleteArticle } from "@/api/article";
import { convertTime } from "@/utils/date";
import Editor from "@/views/editor";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      list: null,
      listLoading: true,
      drawer: false,
      direction: "rtl",
      articleId: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      personalArticle().then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    statusComputed(status) {
      const statusMap = {
        published: "success",
        draft: "",
        deleted: "danger",
      };
      return statusMap[status];
    },
    convertTime(date) {
      return convertTime(new Date(date));
    },
    handleUpdate(id) {
      this.drawer = true;
      this.articleId = id;
    },
    handleDelete(id, index) {
      console.log(index);
      this.$confirm("是否删除当前文章", "Warning", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.list.splice(index, 1);
          await deleteArticle(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    getNewList() {
      this.drawer = false;
      this.fetchData();
    },
  },
};
</script>
