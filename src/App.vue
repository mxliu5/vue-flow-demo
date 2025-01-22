<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { storeC } from 'turing-plugin'
import useStore from '@/store'
const { theme } = useStore()

/* 不同项目添加class */
const systemClassName = import.meta.env.VITE_SYSTEM_NAME
document.getElementById('app')?.classList.add(systemClassName)

/* 主题色 */
const themeName = storeC.getLocalstorage('theme')
theme.setTheme(themeName)

</script>

<style scoped lang="scss">
</style>
