/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/26 16:02:29
 */

import BzUpload from '@/components/bz-upload'

export default function loadComponent(app: any) {
  app.use(BzUpload)
}
