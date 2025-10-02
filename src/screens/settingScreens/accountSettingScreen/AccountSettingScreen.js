import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import AccountSettingsItem from '../../../components/MyAccount/AccountSettingsItem/AccountSettingsItem';
import SettingsSection from '../../../components/Settings/SettingsSection/SettingsSection';
import ProfilePhotoSelector from '../../../components/ProfilePhotoSelector/ProfilePhotoSelector';
import DisplayName from '../../../components/DisplayName/DisplayName';
import MoreOptionsItem from '../../../components/MyAccount/MoreOptionsItem/MoreOptionsItem';
import { icons } from '../../../constants/icons';
import { SettingsItem } from '../../../components';
import Header from '../../../components/General/Headers/GeneralHeader';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BottomSheet from '@gorhom/bottom-sheet';
import DeleteAccountSheet from '../../../components/DeleteAccountSheet/DeleteAccountSheet';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { AsyncValues } from '../../../utils/AsyncValues';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const AccountSettingScreen = ({ navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [textMessagesEnabled, setTextMessagesEnabled] = useState(false);
  const [phoneCallsEnabled, setPhoneCallsEnabled] = useState(false);
  const dispatch = useDispatch();
  // Bottom sheet ref and state
  const bottomSheetRef = useRef(null);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);

  // Open bottom sheet
  const openDeleteSheet = useCallback(() => {
    setIsDeleteSheetOpen(true);
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 10);
  }, []);

  // Close bottom sheet
  const closeDeleteSheet = useCallback(() => {
    setIsDeleteSheetOpen(false);
    bottomSheetRef.current?.close();
  }, []);

  // Handle delete action
  const handleDeleteAccount = useCallback(() => {
    // Your delete logic here
    closeDeleteSheet();
    // Optionally navigate or show a toast
  }, [closeDeleteSheet]);

  const handlePhotoSelect = photoId => {
    setSelectedPhoto(photoId);
  };

  const handleEditName = () => {
    console.log('Edit name pressed');
  };
  const handleAccountItemPress = item => {
    if (item === 'Sign Out') {
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              dispatch(logout());
              await AsyncStorage.removeItem(AsyncValues.UserData);
              navigation.reset({
                // ✅ reset stack and go to login
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert(
                'Error occured',
                'An unknown error occured during logging out.Please try again later',
                [{ text: 'ok' }],
              );
            }
          },
        },
      ]);
      // ✅ clear user/session

      //
    } else {
      console.log(`${item} pressed`);
    }
    if (item === 'Change Password') {
      navigation.navigate('ChangePass');
    }
  };

  const handleMoreOptionsPress = item => {
    console.log(`${item} pressed`);
  };

  return (
    <AppSafeAreaView>
      <Header title="Account Settings" />
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
          <AccountSettingsItem
            iconImage={icons.signOut}
            title="Delete Account"
            onPress={openDeleteSheet}
            showArrow={false}
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

      {/* Overlay for shadow effect */}
      {isDeleteSheetOpen && (
        <Pressable
          style={styles.overlay}
          onPress={closeDeleteSheet}
          pointerEvents="auto"
        />
      )}

      {/* Delete Account Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={isDeleteSheetOpen ? 0 : -1}
        snapPoints={['40%']}
        enablePanDownToClose
        onClose={closeDeleteSheet}
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#fff',
        }}
        handleIndicatorStyle={{ backgroundColor: '#E5E5E5' }}
      >
        <DeleteAccountSheet
          onDelete={handleDeleteAccount}
          onClose={closeDeleteSheet}
        />
      </BottomSheet>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
