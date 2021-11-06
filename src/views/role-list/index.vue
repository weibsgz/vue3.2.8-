<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column label="索引" type="index" width="120">
        </el-table-column>
        <el-table-column label="姓名" prop="title">
        </el-table-column>
        <el-table-column label="描述" prop="describe">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="action"
          width="260"
          #default="{ row }"
        >
           <el-button
            type="primary"
            size="mini"
            v-permission="['distributePermission']"
            @click="onDistributePermissionClick(row)"
          >
            分配权限
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { ref } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()


/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref('')

const onDistributePermissionClick = row => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}


</script>

<style lang="scss" scoped></style>
