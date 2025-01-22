# Layout 管理端布局组件

### 基础介绍
Layout组件是管理端页面的布局组件，它由头部/左侧菜单栏/面包屑/以及view页面部分构成，其中路由页面在view中进行切换，其他部分固定

### 作为子应用集成
当项目作为子应用嵌入到其他平台，默认仅需提供view页面以及面包屑部分即可，按照是否集成 的逻辑将头部/左侧菜单栏隐藏。


```vue
<template>
  <el-container class="layout" :class="{'only-view': isQiankun}">
    <!-- 如果作为子应用嵌入其他平台，隐藏头部 -->
    <el-header v-if="!isQiankun" style="height: 50px">
      <Header></Header>
    </el-header>
    <el-container class="layout-section">
        <!-- 如果作为子应用嵌入其他平台，隐藏左侧菜单栏 -->
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
import useStore from "@/store";
import { isQiankun } from "@/utils/constants";

const { authority } = useStore()
const { loadAndSetUserInfo } = authority

const _created = () => {
  loadAndSetUserInfo()
}
_created()

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

```

:::warning
由于需要考虑项目后期可能适配微应用集成，因此在开发组件时，应尽量保证代码的解耦性，即将各组件的逻辑代码放在各自的组件去做，而不是依赖于layout.vue父组件。这样能够保证后期可以按需直接将sidebar以及header组件隐藏，而不影响其他功能
:::