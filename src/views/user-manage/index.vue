<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" v-permission="['importUser']"> excel 导入</el-button>
        <el-button type="success">
            导出EXCEL
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">员工</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" label="开通时间">        
           <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="260"
        >
          <template #default="scope">
            <el-button type="primary" size="mini" >show</el-button>
            <el-button type="info" size="mini" @click="onShowRoleClick(scope.row)">角色</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <roles-dialog v-model="roleDialogVisible" :userId="selectUserId" @updateRole="getListData"></roles-dialog>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue'
import { getUserManageList } from '@/api/user-manage'

import RolesDialog from './components/roles.vue'


// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
// 监听语言切换


// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

/**
 * 查看角色的点击事件
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = row => {
  roleDialogVisible.value = true

  console.log('row',row)
  selectUserId.value = row._id
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})


</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>

