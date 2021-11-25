<template>
  <div class="mock">
    <span @click="mock"> 测试的</span>
  </div>
</template>

<script>
export default {
  name: "testmock",
  data() {
    return {};
  },
  methods: {
    mock() {
      this.$axios({
        method: "get",
        url: "/mock",
        data: {},
      })
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.mock {
  height: 200px;
  background: aquamarine;
  width: 200px;
}
</style>