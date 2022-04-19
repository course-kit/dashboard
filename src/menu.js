import {
  mdiAccountCircle,
  mdiTelevisionGuide,
  // mdiChartLine,
  mdiReceipt,
  mdiSchool,
  mdiArrowRightBold,
  mdiAccountGroup
} from '@mdi/js'

export default [
  [
    {
      to: '/start',
      label: 'Get started',
      icon: mdiArrowRightBold
    },
    {
      to: '/school',
      label: 'School',
      icon: mdiSchool
    },
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
    // {
    //   to: '/analytics',
    //   label: 'Analytics',
    //   icon: mdiChartLine
    // },
    {
      to: '/billing',
      label: 'Billing',
      icon: mdiReceipt
    },
    {
      to: '/integrations',
      label: 'Integrations',
      icon: mdiReceipt
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: mdiAccountCircle
    }
    // {
    //   to: '/billing',
    //   label: 'Billing',
    //   icon: mdiReceipt
    // }
  ]
]
