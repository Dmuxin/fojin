/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Users',
  meta: {
    title: '用户管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'markdown',
      component: () => import('@/views/users/markdown'),
      name: 'MarkdownDemo',
      meta: { title: '微信用户' }
    }
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/users/keyboard'),
    //   name: 'KeyboardChart',
    //   meta: { title: '地址管理', noCache: true }
    // },
    // {
    //   path: 'admin',
    //   component: () => import('@/views/users/admin'),
    //   name: 'administrator',
    //   meta: { title: '维护人员', noCache: true }
    // }
  ]
}

export default usersRouter
