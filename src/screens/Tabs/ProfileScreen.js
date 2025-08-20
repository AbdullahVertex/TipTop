import React from 'react';
import ProfileGallery from '../../components/Profile/ProfileGallery';
import { ProfileHeader } from '../../components/Profile/ProfileStats';
const ProfileScreen = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileGallery />
    </>
  );
};
export default ProfileScreen;
