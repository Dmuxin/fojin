/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mapRouter = {
  path: '/map',
  component: Layout,
  redirect: 'noRedirect',
  name: 'MapDemo',
  meta: {
    title: '地图',
    icon: 'el-icon-map-location'
  },
  children: [
    {
      path: 'mapceshi2',
      component: () => import('@/views/map/mapceshi2'),
      name: 'mapceshi2',
      meta: { title: '地图展示', keepAlive: true }
      // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    }
  ]
}

export default mapRouter
