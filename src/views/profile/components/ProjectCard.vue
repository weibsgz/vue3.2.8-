<template>
  <div class="">
       
      <div>Hello!</div>
        <img :src="$store.getters.userInfo.avatar" /> 
        <div>  
          {{ $store.getters.userInfo.title }}
          {{ $store.getters.userInfo.username }}
        </div>
 
  </div>
</template>

<script setup>
import panThumb from './panThumb'
import {} from 'vue'

import {useStore} from 'vuex'

const store = useStore()
console.log('store',store.getters.userInfo)
</script>

<style lang="scss" scoped></style>


