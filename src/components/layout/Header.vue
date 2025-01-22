<template>
  <div class="layout-header">
    <div class="tool-bar-left">
      <tu-svg-icon class="logo"name="logo" :width="28" />
      <h2 class="logo-text" style="margin-left: 12px">vue-flow</h2>
    </div>
    <div class="tool-bar-right flex">
      <!-- 语言切换 -->
      <el-dropdown @command="changeLang">
        <tu-svg-icon name="lang" :width="28"  style="cursor: pointer;"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="(item, index) of langConfig" 
              :key="index"
              :command="item.value">
             {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 皮肤切换 -->
      <el-dropdown @command="changeTheme">
        <tu-svg-icon name="pifu" :width="32"  style="margin: 0 16px;cursor: pointer;"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="(item, index) of themes" 
              :key="index"
              :command="item.type">
             {{ item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <tu-svg-icon name="icon-user" :width="36" style="margin-right: 16px;" />
      <el-dropdown @command="handleCommand">
        <div class="label-item logou-wrap">
          <label>账号：</label>
          {{ userName }}
          <tu-svg-icon name="icon-drop" style="margin-left: 10px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeC } from 'turing-plugin'
import { logout } from '@/api/authority'
import useStore from '@/store'
import { storeToRefs } from "pinia";
import langConfig from "@/lang/langConfig"
import useCtx from '@/hooks/useCtx';
const { $router } = useCtx()
const { authority, theme } = useStore()
const { userName } = storeToRefs(authority);  // 这里一定要使用storeToRefs，才能实时获取用户名称
// 退出登录
const handleCommand = (val: string) => {
  if (val === 'logout') {
    logout()
  }
}

/* 主题切换 */
const themes = [
  { title: "默认主题", type: "default" },
  { title: "松石绿主题", type: "green" },
  { title: "暗夜灰", type: "gray" }
];
const changeTheme = (str: string) => {
  theme.setTheme(str)
};

/* 语言切换 */
const changeLang= (val: string) => {
  storeC.setLocalstorage('localeKey', val)
  $router.go(0)
};
</script>

<style lang="scss" scoped>
.tool-bar-left {
  .logo-text {
    font-weight: 500;
    font-size: 22px;
  }
}
</style>
