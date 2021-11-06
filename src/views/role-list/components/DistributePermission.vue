<template>
  <el-dialog
    title="配置角色"
    :model-value="modelValue"
    @close="closed"
  >
     <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits,ref,watch } from 'vue'
import { permissionList } from '@/api/permission'
import { rolePermission , distributePermission} from '@/api/role'

import { ElMessage } from 'element-plus'


const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
   roleId: {
    type: String,
    required: true
  }
})
const treeRef = ref(null)
// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

const emits = defineEmits(['update:modelValue'])

// 所有权限
const allPermission = ref([])

const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()


// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  console.log('checkedKeys',checkedKeys) //["1","1-1","1-2","1-3","2","2-1","3","4","5"]   超级管理员 这种
  //element plus方法
  treeRef.value.setCheckedKeys(checkedKeys)
}


watch(
  () => props.roleId,
  val => {
    if (val) getRolePermission()
  }
)


/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys() //获取选中的节点
  })
  ElMessage.success('修改成功')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>



