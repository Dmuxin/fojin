/** When your routing table is too long, you can split it into small modules **/
import Layout from '@/layout'
const smsRouter = {
  path: '/announcement',
  component: Layout,
  redirect: 'noRedirect',
  name: 'PostAnnouncement',
  meta: {
    title: '发布公告',
    icon: 'el-icon-bell'
  },
  children: [
    {
      path: 'announcement',
      component: () => import('@/views/announcement/PostAnnouncement'),
      name: 'announcement2',
      meta: { title: '发布公告' }
    }

  ]
}

export default smsRouter
