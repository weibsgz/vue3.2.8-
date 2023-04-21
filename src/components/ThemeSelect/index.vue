<template>
  <!-- 主题图标  
  v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip content="主题更换">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          更换（没有做完
          只放到了vuex和缓存中，然后把这个主题色替换CSS变量）</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div><select-color v-model:modelValue="selectColorVisible"></select-color></div>
</template>

<script setup>
import SelectColor from "./components/SelectColor.vue";
import { ref } from "vue";

const selectColorVisible = ref(false);
const handleSetTheme = (command) => {
  selectColorVisible.value = true;
};
</script>

<style lang="scss" scoped></style>
