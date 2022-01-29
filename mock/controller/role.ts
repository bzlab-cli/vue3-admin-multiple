/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 16:04:00
 */

import { prefix, get } from '../decorator/request'
import { menuGrantByRole } from '../data/role'

@prefix('/business-web')
export default class User {
  @get('/role/getRoleSelect2')
  async getRoleSelect2() {
    return [
      { id: 'ad', roleName: '系统管理员', roleType: 1 },
      { id: 'sub_ad', roleName: '子管理员', roleType: 2 },
      { id: 'daf879df-230c-476d-8179-62bca11870cc', roleName: '测试员', roleType: 3 }
    ]
  }

  @get('/role/getRoleList')
  getRoleList() {
    return {
      total: 3,
      list: [
        {
          id: 'ad',
          roleName: '系统管理员',
          orgId: 0,
          orgName: null,
          remarks: '系统管理员',
          editFlag: 0,
          status: 0,
          createUser: '',
          createTime: '2021-11-05 15:56:05',
          updateUser: '',
          updateTime: '2021-11-05 15:56:22'
        },
        {
          id: 'sub_ad',
          roleName: '大区管理员',
          orgId: 0,
          orgName: null,
          remarks: '大区管理员',
          editFlag: 0,
          status: 0,
          createUser: '',
          createTime: '2021-11-05 15:56:05',
          updateUser: '',
          updateTime: '2021-11-17 15:30:30'
        },
        {
          id: 'daf879df-230c-476d-8179-62bca11870cc',
          roleName: '测试员',
          orgId: 0,
          orgName: null,
          remarks: '',
          editFlag: 1,
          status: 0,
          createUser: '1ee3d49b-aa78-4846-a1b7-76044d097c8e',
          createTime: '2021-12-13 15:06:48',
          updateUser: '1ee3d49b-aa78-4846-a1b7-76044d097c8e',
          updateTime: '2021-12-13 15:06:48'
        }
      ] as any,
      pageNum: 1,
      pageSize: 10,
      size: 3,
      startRow: 1,
      endRow: 3,
      pages: 1,
      prePage: 0,
      nextPage: 0,
      isFirstPage: true,
      isLastPage: true,
      hasPreviousPage: false,
      hasNextPage: false,
      navigatePages: 8,
      navigatepageNums: [1],
      navigateFirstPage: 1,
      navigateLastPage: 1
    }
  }

  @get('/role/getMenuGrantByRoleId')
  getMenuGrantByRoleId() {
    return menuGrantByRole
  }
}
