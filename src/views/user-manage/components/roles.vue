  <template>
 <el-dialog
   title="配置角色"
   :model-value="modelValue"
   @close="closed"
 >
     <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>


   <template #footer>
     <span class="dialog-footer">
       <el-button @click="closed">取消</el-button>
       <el-button type="primary" @click="onConfirm">
        确认
       </el-button>
     </span>
   </template>
 </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits,ref,watch} from 'vue'

import { roleList } from '@/api/role'
import {userRoles,updateRole} from '@/api/user-manage'

import {ElMessage} from 'element-plus'


const props = defineProps({
 modelValue: {
   type: Boolean,
   required: true
 },
 userId: {
	    type: String,
	    required: true
	}
})


// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()

// 当前用户角色
const userRoleTitleList = ref([])

const emits = defineEmits(['update:modelValue','updateRole'])

const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map(item => item.title)
}
//因为页面加载的时候没有userID,会报错
watch(
  ()=>props.userId,
  val=>{
    if(val) getUserRoles()
  }
)


/**
 确定按钮点击事件
*/

const onConfirm = async () => {
  // 处理数据结构

  const roles = userRoleTitleList.value.map(title => {
    return allRoleList.value.find(role => role.title === title)
  })




  await updateRole(props.userId, roles)

  ElMessage.success('修改成功')
  emits('updateRole')
  closed()
}


/**
* 关闭
*/
const closed = () => {
 emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
