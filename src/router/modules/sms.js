/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const smsRouter = {
  path: '/sms',
  component: Layout,
  redirect: 'noRedirect',
  name: 'SmsManage',
  meta: {
    title: '高级居士',
    icon: 'table'
  },
  children: [
    {
      path: 'smsrecord',
      component: () => import('@/views/sms/smsrecord'),
      name: 'smsRecord',
      meta: { title: '高级居士' }
    }
    // {
    //   path: 'smsstatistics',
    //   component: () => import('@/views/sms/smsstatistics'),
    //   name: 'smsStatistics',
    //   meta: { title: '查询统计' }
    // },
  ]
}

export default smsRouter
