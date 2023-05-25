import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthSec from '@molecules/AuthSec';
import AdminLogin from '@templates/Admin-Login';
import NotFoundPage from '@organisms/ErrorPage';
import LoginForm from '@organisms/Admin-Login/Login';
import DashBoardTemplate from '@templates/Dashboard';
import DashboardUsers from '@organisms/Dashboard/Users';
import EmptyContainer from '@organisms/Empty-Container';
import BlogsPost from '@organisms/Dashboard/Blogs/Posts';
import BlogMedia from '@organisms/Dashboard/Blogs/Media';
import BlogBuilderTemplate from '@templates/BlogBuilder';
import BlogBuilderJobPreview from '@templates/Job-Preview';
import BlogOverview from '@organisms/Dashboard/Blogs/Overview';
import BlogCategories from '@organisms/Dashboard/Blogs/Categories';
import PostComment from '@organisms/Dashboard/Blogs/Posts/comment';
import ResetPasswordForm from '@organisms/Admin-Login/ResetPassword';
import ForgotPasswordForm from '@organisms/Admin-Login/RequestResetPassword';
import EditCategory from '@organisms/Dashboard/Blogs/Categories/editCategory';
import RolesAndPermissions from '@organisms/Dashboard/Users/RolesAndPermissions';
import AddNewCategories from '@organisms/Dashboard/Blogs/Categories/addNewCategory';
import MediaAttachmentDetails from '@organisms/Dashboard/Blogs/Media/AttachmentDetails';

// This contains all of the path of the application according to react-router-dom
export const path = [
  {
    path: '/',
    element: <AdminLogin />,
    children: [
      {
        path: '/',
        element: <LoginForm />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordForm />,
      },
      {
        path: '/reset-password/:token',
        element: <ResetPasswordForm />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthSec>
        <DashBoardTemplate />
      </AuthSec>
    ),
    children: [
      {
        path: 'blogs',
        element: <EmptyContainer />,
        children: [
          {
            path: 'overview',
            element: <BlogOverview />,
          },
          {
            path: 'posts',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <BlogsPost />,
              },
              {
                path: 'comments',
                element: <PostComment />,
              },
            ],
          },
          {
            path: 'categories',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <BlogCategories />,
              },
              {
                path: 'add-new-category',
                element: <AddNewCategories />,
              },
              {
                path: ':id',
                element: <EditCategory />,
              },
            ],
          },
          {
            path: 'media',
            element: <Outlet />,
            children: [
              {
                path: '',
                element: <BlogMedia />,
              },
              {
                path: 'attachment-details/:id',
                element: <MediaAttachmentDetails />,
              },
            ],
          },
        ],
      },
      {
        path: 'users',
        element: <Outlet />,
        children: [
          { path: 'users-details', element: <DashboardUsers /> },
          { path: 'roles-and-permissions', element: <RolesAndPermissions /> },
        ],
      },
    ],
  },
  {
    path: 'blog-builder/:id',
    element: (
      <AuthSec>
        <BlogBuilderTemplate />
      </AuthSec>
    ),
  },
  {
    path: 'blog-preview/:id',
    element: (
      <AuthSec>
        <BlogBuilderJobPreview />
      </AuthSec>
    ),
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
];
