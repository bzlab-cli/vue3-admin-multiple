/*
 * @Author: jrucker
 * @Description: 布局配置
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/26 09:54:42
 */

interface LayoutSettings {
  showTagsView: boolean 
  showSidebarLogo: boolean 
  fixedHeader: boolean 
  sidebarTextTheme: boolean 
}
  
const layoutSettings: LayoutSettings = {
  showTagsView: false,
  fixedHeader: true,
  showSidebarLogo: true,
  sidebarTextTheme: true,
}

export default layoutSettings