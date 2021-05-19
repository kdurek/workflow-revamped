import Head from 'next/head';

import DefaultLayout from '@/layouts/core';
import PasswordChange from '@/modules/profile/PasswordChange';
import UserDetails from '@/modules/profile/UserDetails';

const ProfilePage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Profile</title>
      </Head>
      <UserDetails />
      <PasswordChange />
    </DefaultLayout>
  );
};

export default ProfilePage;
