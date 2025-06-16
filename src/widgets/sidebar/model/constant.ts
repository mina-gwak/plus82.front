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

export const businessItems: MenuItemData[] = [
  {
    title: '학원 페이지',
    url: '/business/setting/my-academy',
  },
  {
    title: '내 계정',
    subItems: [
      {
        title: '개인 정보',
        url: '/business/setting/my-account/personal-information',
      },
      {
        title: '비밀번호 변경',
        url: '/business/setting/my-account/change-password',
      },
    ],
  },
]
