import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/user/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'sidenav-text'
  },

  {
    title: 'User Profile',
    path: '/user/profile',
    icon: <IoIcons.IoMdPeople />,
    cName: 'sidenav-text'
  },

  {
    title: 'Vote',
    path: '/user/vote',
    icon: <IoIcons.IoIosPaper />,
    cName: 'sidenav-text'
  },

  {
    title: 'Support',
    path: '/user/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'sidenav-text'
  }
];