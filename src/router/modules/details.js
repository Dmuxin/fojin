/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mapRouter = {
  path: '/details',
  hidden: true, // (默认 false)
  component: Layout,
  redirect: 'noRedirect',
  name: 'detailsDemo',
  meta: {
    title: '详情',
    icon: 'el-icon-map-location'
  },
  children: [
    {
      path: 'details',
      component: () => import('@/views/details/details'),
      name: 'details2',
      meta: { title: '用户详情', keepAlive: true }
      // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    },
    {
      path: 'ScriptureDetailed',
      component: () => import('@/views/details/ScriptureDetailed'),
      name: 'ScriptureDetailed',
      meta: { title: '抄写记录', keepAlive: true }
      // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    }

  ]
}

export default mapRouter
