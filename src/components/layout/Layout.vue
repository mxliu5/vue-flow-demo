<template>
  <el-container class="layout" :class="{'only-view': isQiankun}">
    <el-header v-if="!isQiankun" style="height: 50px">
      <Header></Header>
    </el-header>
    <el-container class="layout-section">
      <Sidebar v-if="!isQiankun"></Sidebar>
      <el-main class="layout-main">
        <Breadcrumb></Breadcrumb>
        <div class="layout-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Breadcrumb from "@/components/layout/Breadcrumb.vue";
import { isQiankun } from "@/utils/constants";

</script>

<style lang="scss">
.layout {
  &.only-view {
    .layout-section {
      height: 100%;
    }
  }
}
</style>
