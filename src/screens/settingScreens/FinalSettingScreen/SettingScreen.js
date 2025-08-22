import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SettingsSection,
  SettingsItem,
  AccountSettingsItem,
  MoreOptionsItem,
} from '../../../components';
import SaveIcon from '../../../assets/svgs/save.svg';
import LanguageIcon from '../../../assets/svgs/language.svg';
import SettingIcon from '../../../assets/svgs/settings.svg';
import BlockUserIcon from '../../../assets/svgs/block-user.svg';
import QRCodeIcon from '../../../assets/svgs/qr-code.svg';
import CoinWalletIcon from '../../../assets/svgs/coin-wallet.svg';
import EyeIcon from '../../../assets/svgs/eye.svg';
import PeopleIcon from '../../../assets/svgs/users.svg';
import MessageIcon from '../../../assets/svgs/message.svg';
import BellIcon from '../../../assets/svgs/bell.svg';
import PrimaryColors from '../../../constants/colors';
import { icons } from '../../../constants/icons';
import BecomePlus from '../../../components/Settings/BecomePlusButton/BecomPlusButton';
import Header from '../../../components/General/Headers/GeneralHeader';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';

const svgColor = '#374151';

const SettingScreen = ({ navigation }) => {
  const [showFollowings, setShowFollowings] = useState(true);
  const [showChatButton, setShowChatButton] = useState(false);
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [textMessagesEnabled, setTextMessagesEnabled] = useState(false);
  const [phoneCallsEnabled, setPhoneCallsEnabled] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSavedPosts = () => {
    navigation.navigate('SavedPosts');
  };

  const handleLanguages = () => {
    navigation.navigate('SubscriptionScreen');
  };

  const handleBlockedUsers = () => {
    navigation.navigate('BlockedUsers');
  };

  const handleQRCode = () => {
    navigation.navigate('MyQRCode');
  };

  const handleCoinWallet = () => {
    navigation.navigate('CoinWallet');
    // Navigate to coin wallet screen
  };

  const handleWhoCanSeePosts = () => {
    // Show dropdown for post visibility
  };
  const handleAccountItemPress = item => {
    console.log(`${item} pressed`);
  };

  const handleNotifications = () => {
    navigation.navigate('NotificationScreen');
  };
  const handleSubscription = () => {
    navigation.navigate('SubscriptionScreen');
  };

  // Array for account settings items
  const accountSettingsItems = [
    {
      icon: <SettingIcon width={24} height={24} color={svgColor} />,
      title: 'Account Settings',
      onPress: () => navigation.navigate('AccountSettingScreen'),
      showArrow: true,
    },
    {
      icon: <SaveIcon width={24} height={24} color={svgColor} />,
      title: 'Saved Posts',
      onPress: handleSavedPosts,
      showArrow: true,
    },
    {
      icon: <LanguageIcon width={24} height={24} color={svgColor} />,
      title: 'Languages',
      onPress: handleLanguages,
      showArrow: true,
    },
    {
      icon: <BlockUserIcon width={24} height={24} color={svgColor} />,
      title: 'Blocked Users',
      onPress: handleBlockedUsers,
      showArrow: true,
    },
    {
      icon: <QRCodeIcon width={24} height={24} color={svgColor} />,
      title: 'My QR Code',
      onPress: handleQRCode,
      showArrow: true,
    },
    {
      icon: <CoinWalletIcon width={24} height={24} color={svgColor} />,
      title: 'Coin Wallet',
      onPress: handleCoinWallet,
      showArrow: true,
    },
    {
      icon: <BlockUserIcon width={24} height={24} color={svgColor} />,
      title: 'Subscription',
      onPress: handleSubscription,
      showArrow: true,
    },
  ];

  return (
    <AppSafeAreaView style={{ backgroundColor: '#F9F9F9' }}>
      <ScrollView>
        {/* Header */}
        <Header title="Settings" />

        <View style={styles.content}>
          <BecomePlus title={'Become'} subtitle={'Plus'} />
          {/* More Options */}
          <SettingsSection>
            {accountSettingsItems.map((item, idx) => (
              <SettingsItem
                key={item.title}
                title={item.title}
                onPress={item.onPress}
                showArrow={item.showArrow}
              />
            ))}
          </SettingsSection>
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

          {/* Privacy Section */}
          <SettingsSection title="Privacy">
            <SettingsItem
              icon={<EyeIcon width={24} height={24} color={svgColor} />}
              title="Who Can See Posts"
              onPress={handleWhoCanSeePosts}
              showDropdown={true}
              dropdownValue="Followers Only"
              showArrow={true}
            />
            <SettingsItem
              icon={<PeopleIcon width={24} height={24} color={svgColor} />}
              title="Show My Followings"
              showToggle={true}
              toggleValue={showFollowings}
              onToggleChange={setShowFollowings}
              switchActiveColor={'#C084FC'}
              switchInactiveColor="#E5E7EB"
            />
            <SettingsItem
              icon={<MessageIcon width={24} height={24} color={svgColor} />}
              title="Show Chat Button"
              showToggle={true}
              toggleValue={showChatButton}
              onToggleChange={setShowChatButton}
              switchActiveColor={'#C084FC'}
              switchInactiveColor="#E5E7EB"
            />
            <SettingsItem
              icon={<BellIcon width={24} height={24} color={svgColor} />}
              title="Notifications"
              onPress={handleNotifications}
              showArrow={true}
            />
          </SettingsSection>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  backButton: {
    padding: wp('1%'),
  },
  headerTitle: {
    fontSize: wp('5.5%'),
    color: '#333',
    marginLeft: wp('5%'),
    fontWeight: '800',
  },
  headerSpacer: {
    width: wp('8%'),
  },
  content: {
    flex: 1,
    paddingTop: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },
});
