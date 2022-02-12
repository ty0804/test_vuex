
<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItemToList" :disabled="isDisabled"
      >添加事项</a-button
    >

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="cbStatusChange($event, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <!-- <span>{{ $store.getters.unDoneLength }}条剩余</span> -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      isDisabled: true,
    };
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["unDoneLength", "infoList"]),
  },
  methods: {
    // 监听文本框内容变化
    handleInputChange(e) {
      this.$store.commit("handleInputChange", e.target.value);
      if (e.target.value.trim().length <= 0) this.isDisabled = true;
      else this.isDisabled = false;
    },
    // 向列表中新增item项
    addItemToList() {
      // if (this.inputValue.trim().length <= 0) {
      // return this.$message.warning("文本框内容为空");
      // }
      this.$store.commit("addItem");
    },
    removeItemById(id) {
      this.$store.commit("removeItem", id);
    },
    // 监听复选框选中状态变化
    cbStatusChange(e, id) {
      console.log(e.target.checked, id);
      const param = {
        id: id,
        status: e.target.checked,
      };
      this.$store.commit("changeStatus", param);
    },
    // 清除已完成的数据
    clean() {
      this.$store.commit("cleanDone");
    },
    // 改变按钮高亮状态
    changeList(key) {
      this.$store.commit("changeViewKey", key);
    },
  },
};
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
