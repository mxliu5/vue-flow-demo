
<template>
  <div class="layout-tab">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) of breadcrumbList"
        :key="index"
        :to="isLast(breadcrumbList, index) ? '' :{
          name: item.name,
          params: item.params
        } "
        replace
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import useCtx from "@/hooks/useCtx";
const { $app } = useCtx();

const isLast = (arr: any, index: number) => {
  return arr.length-1 === index
}

const breadcrumbList = ref<Array<any>>([]);
const getBreadcrumbList = () => {
  // 当前页面的路由名称
  const routeName = $app.$route.name
  // 当前页面的父级路由【matched数组中倒数第二个就是当前路由的父级路由】
  const parentRoute = $app.$route.matched.slice(-2, -1)[0];
  // 当前页面父级路由的所有子级路由
  const parentChildren = parentRoute.children || []
  // 遍历父级所有的children，将包含在当前路由名称中的路由都添加到面包屑中。如当前路由名称为list::detail 那么应该将路由名称为list以及list:detail都加入到面包屑
  const filterArr = parentChildren.filter((item: any) => routeName.includes(item.name))
  // 面包屑元素转换
  const metaLabel = $app.$route.query?.metaLabel
  breadcrumbList.value = filterArr.map((x: any, index: number) => {
    const title = isLast(filterArr, index) ? (metaLabel || x.meta?.label) : x.meta?.label // 自定义最后一级的面包屑名称
    const level = (x.name?.split('::')).length  // 面包屑层级 如list 为一级面包 list::detail为二级面包屑 list::detail:detail2为三级面包屑
    return {
      title,
      name: x.name,
      params: $app.$route.params,
      level
    };
  }).sort((a: any, b: any) => a.level - b.level);

  // console.log('当前路由', $app.$route)
  // console.log('parentRoute', parentRoute)
  // console.log('parentChildren', parentChildren)
  // console.log(555, breadcrumbList.value)
};
watch(
  () => $app.$route,
  () => {
    getBreadcrumbList()
  }
);
onMounted(() => {
  getBreadcrumbList()
})
</script>
