/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const echartsRouter = {
  path: '/echarts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'echartsDemo',
  meta: {
    title: '数据统计',
    icon: 'el-icon-s-data'
  },
  children: [
    // {
    //     path: 'echartsceshi',
    //     component: () => import('@/views/echarts/echartsceshi'),
    //     name: 'echartsceshi',
    //     meta: { title: '数据可视化1' }
    // },
    // {
    //     path: 'echartsceshi2',
    //     component: () => import('@/views/echarts/echartsceshi2'),
    //     name: 'echartsceshi2',
    //     meta: { title: '数据可视化2', noCache: true }
    // },
    {
      path: 'echartsceshi3',
      component: () => import('@/views/echarts/echartsceshi3'),
      name: 'echartsceshi3',
      meta: { title: '数据可视化3', noCache: true }
    }
    // {
    //   path: 'smsstatistics',
    //   component: () => import('@/views/sms/smsstatistics'),
    //   name: 'smsStatistics',
    //   meta: { title: '查询统计' }
    // },
  ]
}

export default echartsRouter
