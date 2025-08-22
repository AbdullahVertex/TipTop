import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountSettingsItem from '../../../components/MyAccount/AccountSettingsItem/AccountSettingsItem';
import SettingsSection from '../../../components/Settings/SettingsSection/SettingsSection';
import ProfilePhotoSelector from '../../../components/ProfilePhotoSelector/ProfilePhotoSelector';
import DisplayName from '../../../components/DisplayName/DisplayName';
import MoreOptionsItem from '../../../components/MyAccount/MoreOptionsItem/MoreOptionsItem';
import { icons } from '../../../constants/icons';
import { SettingsItem } from '../../../components';
import Header from '../../../components/General/Headers/GeneralHeader';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';

// Responsive utils
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AccountSettingScreen = ({ navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [textMessagesEnabled, setTextMessagesEnabled] = useState(false);
  const [phoneCallsEnabled, setPhoneCallsEnabled] = useState(false);

  const handlePhotoSelect = photoId => {
    setSelectedPhoto(photoId);
  };

  const handleEditName = () => {
    console.log('Edit name pressed');
  };

  const handleAccountItemPress = item => {
    console.log(`${item} pressed`);
  };

  const handleMoreOptionsPress = item => {
    console.log(`${item} pressed`);
  };

  return (
    <AppSafeAreaView>
      <Header
        title="Account Settings"
        // rightElement={
        //   <TouchableOpacity style={styles.moreButton}>
        //     <Icon name="ellipsis-horizontal" size={hp('3%')} color="#333" />
        //   </TouchableOpacity>
        // }
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Selector */}
        <ProfilePhotoSelector
          selectedPhoto={selectedPhoto}
          onPhotoSelect={handlePhotoSelect}
        />

        {/* Display Name */}
        <DisplayName name="Camilla Scianna" onEditPress={handleEditName} />

        {/* Account Section */}
        <SettingsSection title="Account">
          <AccountSettingsItem
            iconImage={icons.lock}
            title="Change Password"
            onPress={() => handleAccountItemPress('Change Password')}
            showArrow={true}
          />
          <AccountSettingsItem
            iconImage={icons.notification}
            title="Notifications"
            onPress={() => handleAccountItemPress('Notifications')}
            showArrow={true}
          />
          <AccountSettingsItem
            iconImage={icons.hand}
            title="Privacy Settings"
            onPress={() => handleAccountItemPress('Privacy Settings')}
            showArrow={true}
          />
          <AccountSettingsItem
            iconImage={icons.signOut}
            title="Sign Out"
            onPress={() => handleAccountItemPress('Sign Out')}
            showArrow={true}
          />
        </SettingsSection>

        {/* More Options */}
        <SettingsSection title="More Options">
          <SettingsItem
            title="Newsletter"
            showToggle={true}
            toggleValue={newsletterEnabled}
            onToggleChange={setNewsletterEnabled}
            switchActiveColor={'#4BD964'}
            switchInactiveColor="#E5E7EB"
          />
          <SettingsItem
            title="Text Messages"
            showToggle={true}
            toggleValue={textMessagesEnabled}
            onToggleChange={setTextMessagesEnabled}
            switchActiveColor={'#4BD964'}
            switchInactiveColor="#E5E7EB"
          />
          <SettingsItem
            title="Phone Calls"
            showToggle={true}
            toggleValue={phoneCallsEnabled}
            onToggleChange={setPhoneCallsEnabled}
            switchActiveColor={'#4BD964'}
            switchInactiveColor="#E5E7EB"
          />
          <MoreOptionsItem
            title="Currency"
            subtitle="$ - USD"
            onPress={() => handleMoreOptionsPress('Currency')}
          />
          <MoreOptionsItem
            title="Languages"
            subtitle="English"
            onPress={() => handleMoreOptionsPress('Languages')}
          />
          <MoreOptionsItem
            title="Linked Accounts"
            subtitle="Facebook, Google"
            onPress={() => handleMoreOptionsPress('Linked Accounts')}
          />
        </SettingsSection>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default AccountSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  backButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: hp('2.7%'),
    fontWeight: '600',
    color: '#333',
  },
  moreButton: {
    width: wp('10%'),
    height: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
});
