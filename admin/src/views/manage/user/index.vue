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
      <el-table-column label="用户">
        <template slot-scope="scope">
          <div style="display: flex; gap: 20px">
            <div>
              <img :src="scope.row.avatar" alt="" style="height: 40px" />
            </div>
            <div style="height: 40px; line-height: 40px">
              {{ scope.row.username }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="用户权限"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="roleComputed(scope.row.role)" effect="dark">{{
            scope.row.role
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        width="200"
      >
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { manageUser } from "@/api/user";

export default {
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      manageUser().then((response) => {
        console.log(response);
        this.list = response.data;
        this.listLoading = false;
      });
    },
    roleComputed(status) {
      const statusMap = {
        normal: "",
        admin: "warning",
      };
      return statusMap[status];
    },
  },
};
</script>

