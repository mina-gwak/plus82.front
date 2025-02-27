import { MenuItemData } from './type'

export const items: MenuItemData[] = [
  {
    title: 'My Page',
    url: '/setting/my-page',
  },
  {
    title: 'My Job Posting',
    url: '/setting/my-job-posting',
  },
  {
    title: 'Resume',
    url: '/setting/resume',
  },
  {
    title: 'My Account',
    subItems: [
      {
        title: 'Personal Information',
        url: '/setting/my-account/personal-information',
      },
      {
        title: 'Change Password',
        url: '/setting/my-account/change-password',
      },
    ],
  },
]
