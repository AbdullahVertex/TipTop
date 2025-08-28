import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import EndStreamModal from '../Modals/General/GeneralModal';
import { useNavigation } from '@react-navigation/native';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera permission to take photos',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const StoryItem = ({ uri, isOnline, isUser, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets.length > 0
      ) {
        navigation.navigate('EditStory', {
          imageUri: response.assets[0].uri,
        });
      }
    });
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      alert('Camera permission denied');
      return;
    }
    setModalVisible(false);
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, response => {
      console.log('Camera response:', response); // Debug!
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets &&
        response.assets.length > 0
      ) {
        navigation.navigate('EditStory', {
          imageUri: response.assets[0].uri,
        });
      }
    });
  };

  return (
    <View style={styles.container} onPress={onPress}>
      <View style={[styles.imageWrapper, isUser && styles.userBorder]}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={{ uri }} resizeMode="contain" style={styles.image} />
        </TouchableOpacity>
        {isUser && (
          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="add" size={hp('1.6%')} color="#fff" />
          </TouchableOpacity>
        )}
        {isOnline && <View style={styles.onlineDot} />}
      </View>

      <EndStreamModal
        visible={modalVisible}
        label="Post a Story"
        description="Choose a source for your story image."
        button1Label="Gallery"
        button2Label="Camera"
        onCancel={openGallery}
        onConfirm={openCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginHorizontal: wp('2%') },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: wp('7.5%'),
    overflow: 'hidden',
  },
  imageWrapper: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  userBorder: { borderColor: '#6F37EE' },
  image: { width: '100%', height: '100%', borderRadius: wp('7.5%') },
  onlineDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: wp('3.5%'),
    height: wp('3.5%'),
    backgroundColor: '#2ECC71',
    borderRadius: wp('1.75%'),
    borderWidth: 2,
    borderColor: '#fff',
  },
  plusIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#6F37EE',
    borderRadius: wp('2.5%'),
    padding: 2,
  },
});

export default StoryItem;
