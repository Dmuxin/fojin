/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const usersRouter = {
  path: '/scripture',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Scripture',
  meta: {
    title: '经文管理',
    icon: 'el-icon-s-grid'
  },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/scripture/manage'),
      name: 'manage',
      meta: { title: '经文管理' }
    },
    {
      path: 'scriptureAdd',
      component: () => import('@/views/scripture/scriptureAdd'),
      name: 'scriptureAdd',
      meta: { title: '新增经文', noCache: true }
    }

  ]
}

export default usersRouter
