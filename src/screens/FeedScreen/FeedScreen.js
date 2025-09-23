import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import AppSafeAreaView from '../../components/General/SafeAreaView/SafeAreaView';
import StoryBar from '../../components/Feed/StoryBar';
import FeedPost from '../../components/Feed/FeedPost';
import TopNavBar from '../../components/Feed/TopNavBar';

const stories = [
  {
    id: 's1',
    uri: 'https://i.pravatar.cc/100?img=1',
    isUser: true,
    isOnline: false,
  },
  { id: 's2', uri: 'https://i.pravatar.cc/100?img=2', isOnline: true },
  { id: 's3', uri: 'https://i.pravatar.cc/100?img=3', isOnline: true },
  { id: 's4', uri: 'https://i.pravatar.cc/100?img=4', isOnline: false },
];

const posts = [
  {
    id: 'p1',
    avatar: 'https://i.pravatar.cc/100?img=11',
    username: 'brian_lawson',
    isVerified: true,
    time: '15 min',
    text: "Your time is limited, so don't waste it living someone else's life. #thinking",
    likes: 55000,
    comments: 253,
    shares: 75,
    bookmarks: 25,
  },
  {
    id: 'p2',
    avatar: 'https://i.pravatar.cc/100?img=12',
    username: 'jesica_jenner',
    isVerified: true,
    time: '15 min',
    text: 'Get lost in what you love! @brian_lawson #love #getlost #dowhatyoulove',
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800',
    likes: 55000,
    comments: 253,
    shares: 75,
    bookmarks: 25,
  },
];

const FeedScreen = ({ navigation }) => {
  const handleCommentPress = postId => {
    navigation.navigate('Comments');
  };

  return (
    <AppSafeAreaView>
      <TopNavBar navigation={navigation} notificationsCount={2} />
      <StoryBar stories={stories} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FeedPost post={item} onCommentPress={handleCommentPress} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f6f6' },
  title: { fontSize: 22, fontWeight: '700', margin: 15 },
});

export default FeedScreen;
