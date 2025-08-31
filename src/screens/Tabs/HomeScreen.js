import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReelVideoPlayer from '../../components/HomePage/ReelPlayer';
import AppSafeAreaView from '../../components/General/SafeAreaView/SafeAreaView';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverDropdown from '../../components/Feed/DiscoverDropdown';
import FeedScreen from '../FeedScreen/FeedScreen';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.9;

const dummyReels = [
  {
    id: '1',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png',
    caption: 'Sunset in Bali 🌅',
    location: 'Bali, Indonesia',
    likes: 2.3,
    comments: 122,
    shares: 0.8,
    user: { name: 'Maria Gomez', avatar: 'https://i.pravatar.cc/150?img=4' },
  },
  {
    id: '2',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
    caption: 'Adventure begins!',
    location: 'Iceland',
    likes: 4.2,
    comments: 83,
    shares: 1.1,
    user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=10' },
  },
  // Add more...
];

const ReelsScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('DISCOVER');
  const [currentScreen, setCurrentScreen] = useState('discover');
  const flatListRef = useRef();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 80 }).current;

  return (
    <AppSafeAreaView
      style={{ backgroundColor: currentScreen === 'discover' ? 'black' : 'white' }}
      backgroundColor={currentScreen === 'discover' ? 'black' : 'white'}
      barStyle={currentScreen === 'discover' ? 'light-content' : 'dark-content'}
    >
      {/* Simple DISCOVER Header */}
      <View style={styles.header}>
        <View style={styles.leftSection} />
        <TouchableOpacity 
          style={styles.centerSection}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <Text 
            style={[
              styles.title, 
              { fontSize: selectedOption === 'FEEDS' ? 16 : 20 },
              { color: currentScreen === 'discover' ? '#fff' : '#000' }
            ]}
          >
            {selectedOption}
          </Text>
          <Image 
            source={require('../../assets/icons/bxs_up-arrow.png')} 
            style={[styles.upArrow, { tintColor: currentScreen === 'discover' ? '#fff' : '#000' }]}
          />
        </TouchableOpacity>
        <View style={styles.rightSection} />
      </View>

      {/* Dropdown Component */}
      <DiscoverDropdown
        isVisible={isDropdownVisible}
        onOptionSelect={(option) => {
          setSelectedOption(option);
          setIsDropdownVisible(false);
          if (option === 'FEEDS') {
            setCurrentScreen('feeds');
          } else {
            setCurrentScreen('discover');
          }
        }}
        onClose={() => setIsDropdownVisible(false)}
      />

      <View style={{ height: ITEM_HEIGHT }}>
        {currentScreen === 'discover' ? (
          <FlatList
            data={dummyReels}
            keyExtractor={item => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfig}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            ref={flatListRef}
            renderItem={({ item, index }) => (
              <View style={{ height: ITEM_HEIGHT }}>
                {index === currentIndex ? (
                  <ReelVideoPlayer reel={item} isVisible={true} />
                ) : (
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={styles.thumbnail}
                  />
                )}
              </View>
            )}
          />
        ) : (
          <FeedScreen hideHeader={true} navigation={navigation} />
        )}
      </View>
    </AppSafeAreaView>
  );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  thumbnail: {
    height: ITEM_HEIGHT,
    width: '100%',
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  leftSection: {
    width: 40,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 103,
    height: 26,
    justifyContent: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#fff',
  },
  infoIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  upArrow: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
});
