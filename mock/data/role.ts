/*
 * @Author: jrucker
 * @Description: 数据
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/08/12 15:19:41
 */

export const menuGrantByRole = [
  {
    id: 1001,
    parentId: 0,
    menuName: '系统管理',
    menuType: 1,
    menuSort: 2,
    menuComponents: 'Layout',
    menuCode: '',
    menuUrl: '/system',
    menuRoute: 'Layout',
    menuIcon: 'el-icon-menu',
    menuSource: 1,
    hiddenFlag: 1,
    remarks: '',
    status: 0,
    createUser: '',
    createTime: '2021-11-04 14:23:01',
    updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
    updateTime: '2021-11-15 18:27:19',
    hasChild: true,
    grantFlag: true,
    childTreeList: [
      {
        id: 100104,
        parentId: 1001,
        menuName: '用户管理',
        menuType: 2,
        menuSort: 0,
        menuComponents: 'admin/system/user/index.vue',
        menuCode: '',
        menuUrl: 'user',
        menuRoute: 'user',
        menuIcon: 'el-icon-menu',
        menuSource: 1,
        hiddenFlag: 1,
        remarks: '',
        status: 0,
        createUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
        createTime: '2021-11-15 18:22:53',
        updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
        updateTime: '2021-11-15 18:28:13',
        hasChild: true,
        grantFlag: true,
        childTreeList: [
          {
            id: 10010401,
            parentId: 100104,
            menuName: '可见',
            menuType: 3,
            menuSort: 0,
            menuComponents: '',
            menuCode: 'view',
            menuUrl: '',
            menuRoute: '',
            menuIcon: 'el-icon-menu',
            menuSource: 1,
            hiddenFlag: 1,
            remarks: '',
            status: 0,
            createUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            createTime: '2021-11-15 18:35:40',
            updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            updateTime: '2021-11-15 18:35:40',
            hasChild: false,
            grantFlag: true,
            childTreeList: []
          }
        ]
      },
      {
        id: 100101,
        parentId: 1001,
        menuName: '菜单管理',
        menuType: 2,
        menuSort: 1,
        menuComponents: 'admin/system/menu/index.vue',
        menuCode: '',
        menuUrl: 'menu',
        menuRoute: 'menu',
        menuIcon: 'el-icon-menu',
        menuSource: 1,
        hiddenFlag: 1,
        remarks: '',
        status: 0,
        createUser: '',
        createTime: '2021-11-04 14:24:51',
        updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
        updateTime: '2021-11-15 18:28:41',
        hasChild: true,
        grantFlag: true,
        childTreeList: [
          {
            id: 10010101,
            parentId: 100101,
            menuName: '可见',
            menuType: 3,
            menuSort: 1,
            menuComponents: '',
            menuCode: 'view',
            menuUrl: '',
            menuRoute: '',
            menuIcon: 'el-icon-menu',
            menuSource: 1,
            hiddenFlag: 1,
            remarks: '',
            status: 0,
            createUser: '',
            createTime: '2021-11-04 14:34:27',
            updateUser: '',
            updateTime: '2021-11-04 14:34:45',
            hasChild: false,
            grantFlag: true,
            childTreeList: []
          }
        ]
      },
      {
        id: 100102,
        parentId: 1001,
        menuName: '角色管理',
        menuType: 2,
        menuSort: 2,
        menuComponents: 'admin/system/role/index.vue',
        menuCode: '',
        menuUrl: 'role',
        menuRoute: 'role',
        menuIcon: 'el-icon-menu',
        menuSource: 1,
        hiddenFlag: 1,
        remarks: '',
        status: 0,
        createUser: '',
        createTime: '2021-11-04 14:26:21',
        updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
        updateTime: '2021-11-15 18:29:00',
        hasChild: true,
        grantFlag: true,
        childTreeList: [
          {
            id: 10010201,
            parentId: 100102,
            menuName: '可见',
            menuType: 3,
            menuSort: 0,
            menuComponents: '',
            menuCode: 'view',
            menuUrl: '',
            menuRoute: '',
            menuIcon: 'el-icon-menu',
            menuSource: 1,
            hiddenFlag: 1,
            remarks: '',
            status: 0,
            createUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            createTime: '2021-11-15 18:36:24',
            updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            updateTime: '2021-11-15 18:36:24',
            hasChild: false,
            grantFlag: true,
            childTreeList: []
          }
        ]
      },
      {
        id: 100103,
        parentId: 1001,
        menuName: '组织管理',
        menuType: 2,
        menuSort: 3,
        menuComponents: 'admin/system/org/index.vue',
        menuCode: '',
        menuUrl: 'org',
        menuRoute: 'org',
        menuIcon: 'el-icon-menu',
        menuSource: 1,
        hiddenFlag: 1,
        remarks: '',
        status: 0,
        createUser: '',
        createTime: '2021-11-04 14:26:21',
        updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
        updateTime: '2021-11-15 18:29:19',
        hasChild: true,
        grantFlag: true,
        childTreeList: [
          {
            id: 10010301,
            parentId: 100103,
            menuName: '可见',
            menuType: 3,
            menuSort: 0,
            menuComponents: '',
            menuCode: 'view',
            menuUrl: '',
            menuRoute: '',
            menuIcon: 'el-icon-menu',
            menuSource: 1,
            hiddenFlag: 1,
            remarks: '',
            status: 0,
            createUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            createTime: '2021-11-15 18:37:04',
            updateUser: '96f3eddc-4396-11ec-87ee-0242ac110002',
            updateTime: '2021-11-15 18:37:04',
            hasChild: false,
            grantFlag: true,
            childTreeList: []
          }
        ]
      }
    ] as any
  }
]
