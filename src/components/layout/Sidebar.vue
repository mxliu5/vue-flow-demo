<template>
  <div class="layout-sidebar">
    <el-menu
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      :collapse="isCollapse"
      @select="handleSelect"
      class="layout-menu"
    >
      <tempalte v-for="(item, index) of menuList" :key="index">
        <el-sub-menu
          :index="item.url"
          v-if="item.children && item.children.length > 0"
        >
          <template #title>
            <tu-svg-icon :name="item.icon" width="16px" />
            <span style="padding-left: 8px">{{ item.name }}</span>
          </template>
          <el-menu-item
            :index="sub.url"
            v-for="(sub, i) of item.children"
            :key="i"
            @click="toPage(sub)"
          >
            {{ sub.name }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="item.url" v-else @click="toPage(item)">
          <tu-svg-icon v-if="item.url === activeKey" :name="item.icon + '2'" width="16px" />
          <tu-svg-icon v-else :name="item.icon" />
          <span style="padding-left: 8px">{{ item.name }}</span>
        </el-menu-item>
      </tempalte>
    </el-menu>
    <tu-svg-icon
      class="flod-btn"
      name="icon-flod"
      width="18px"
      :class="{ expand: isCollapse }"
      @click="changeCollapse"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { debounce } from "lodash-es";
import useCtx from "@/hooks/useCtx";
import useStore from "@/store";

// 全局变量
const { $app } = useCtx();
const { menu, authority } = useStore();
const { menuList } = storeToRefs(authority)

// 菜单折叠
const { isCollapse } = storeToRefs(menu);
const changeCollapse = () => {
  menu.collapseChange(!isCollapse.value);
};

// 跳转
const toPage = (item: any) => {
  // 当前展开的菜单
  $app.$router.push({
    path: item.url,
  });
};

const activeKey = ref<string>($app.$route.path)
const handleSelect = (val: any) => {
  activeKey.value = val
}

// 获取当前选中的菜单项
const defaultActive = ref<string>($app.$route.path);
const getDefaultActive = () => {
  const splitArr = $app.$route.path.split('/')
  const menuUrl = `/${splitArr[1]}` // 当前菜单项取路由地址中的第一个path
  defaultActive.value =  menuUrl
}

// 获取默认展开的菜单
const defaultOpeneds = ref<Array<string>>([""]);
const getDefaultOpends = () => {
  defaultOpeneds.value = [defaultActive.value];
}
watch(
  () => $app.$route,
  () => {
    getDefaultActive()
    getDefaultOpends()
  }
);

// 当屏幕宽度小于1000时，自动收起菜单栏
const resizeScreem = () => {
  const width = window.innerWidth
  const fold = width < 1000
  menu.collapseChange(fold)
}

onMounted(() => {
  getDefaultActive()
  getDefaultOpends()
  const debounceFun = debounce(resizeScreem, 200)
  window.addEventListener("resize", debounceFun);
})
onUnmounted(() => {
  window.removeEventListener("resize", resizeScreem);
});
</script>

<style lang="scss" scoped>
.flod-btn {
  position: absolute;
  right: 16px;
  bottom: 24px;
  font-size: 24px;
  cursor: pointer;
  &.expand {
    transform: rotate(180deg);
  }
}
</style>
