// 组合式api写法
import { defineStore } from 'pinia'
import { storeC } from 'turing-plugin'

const useThemeStore = defineStore(
  'theme',
  () => {
    // 设置配色主题
    function setTheme(newTheme: string) {
      // 清除之前的theme,将新的主题添加到缓存
      const El = document.querySelector('.turing-ui-frame')
      const oldTheme: any = storeC.getLocalstorage("theme")
      El?.classList.remove(oldTheme)
      El?.classList.add(newTheme)
      // 将当前主题存入缓存
      storeC.setLocalstorage("theme", newTheme)
    }
    return { setTheme }
  }
)
export default useThemeStore