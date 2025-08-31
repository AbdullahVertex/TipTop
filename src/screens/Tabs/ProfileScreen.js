import React from 'react';
import ProfileGallery from '../../components/profile/ProfileGallery';
import { ProfileHeader } from '../../components/profile/ProfileStats';
const ProfileScreen = () => {
  return (
    <>
      <ProfileHeader />
      <ProfileGallery />
    </>
  );
};
export default ProfileScreen;
