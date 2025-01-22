<template>
    <div>
        二级页面
        <tu-button @click="handleClick" style="margin-left: 16px">点击打开三级页面111</tu-button>  
        <data-preview ref="dataPreviewRef"/>
        <version-detail v-if="showVersionVertail" @close="showVersionVertail = false">
        </version-detail>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import  VersionDetail from "./VersionDetail.vue";
const showVersionVertail = ref<boolean>(false)

const handleClick = () => {
  showVersionVertail.value = true
}
</script>

<style scoped>

</style>