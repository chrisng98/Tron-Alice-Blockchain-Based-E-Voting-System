import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '/admin/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'sidenav-text'
  },

  {
    title: 'Add Candidates',
    path: '/admin/addcandidates',
    icon: <IoIcons.IoIosArchive />,
    cName: 'sidenav-text'
  },

  {
    title: 'View Result',
    path: '/admin/result',
    icon: <IoIcons.IoIosPaper />,
    cName: 'sidenav-text'
  },

  {
    title: 'Support',
    path: '/admin/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'sidenav-text'
  }
];