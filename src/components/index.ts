/*
* @Description: 将所有的自定义组件进行全局注册
* @Author: mxliu5
* @Date: 2024-10-16
*/

import { createApp } from "vue";
import myDialog from "@/components/dialog/index.vue";
import myDrawer from "@/components/drawer/index.vue";
import myOperation from "@/components/operation/index.vue";
import myPagination from "@/components/pagination/index.vue";
import TablePage from "@/components/table-page/index.vue";

const components: any = {
  myDialog,
  myDrawer,
  myOperation,
  myPagination,
  TablePage
};
export function initComponent(app: ReturnType<typeof createApp>) {
  for (let componentName in components) {
    const component = components[componentName]
    app.component(componentName, component);
  }
}
