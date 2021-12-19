import {
  mdiAccountCircle,
  mdiTelevisionGuide,
  mdiChartLine,
  mdiReceipt,
  mdiAccountGroup
} from '@mdi/js'

export default [
  [
    {
      to: '/courses',
      label: 'Courses',
      icon: mdiTelevisionGuide
    },
    {
      to: '/students',
      label: 'Students',
      icon: mdiAccountGroup
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: mdiAccountCircle
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: mdiChartLine
    },
    {
      to: '/billing',
      label: 'Billing',
      icon: mdiReceipt
    }
  ]
]
