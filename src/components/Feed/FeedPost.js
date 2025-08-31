import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const FeedPost = ({ post, onCommentPress, isLast = false }) => {
  // function to render text with purple hashtags
  const renderTextWithHashtags = text => {
    return text.split(/(\s+)/).map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <Text key={index} style={styles.hashtag}>
            {part}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.normalText}>
          {part}
        </Text>
      );
    });
  };

  return (
    <View style={[styles.container, isLast && styles.lastPost]}>
      <PostHeader
        avatar={post.avatar}
        username={post.username}
        isVerified={post.isVerified}
        time={post.time}
      />
      <Text style={styles.text}>{renderTextWithHashtags(post.text)}</Text>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <PostFooter
        likes={post.likes}
        comments={post.comments}
        shares={post.shares}
        bookmarks={post.bookmarks}
        onCommentPress={() => onCommentPress(post.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    padding: wp('4%'),
  },
  lastPost: {
    marginBottom: 0,
  },
  text: {
    fontSize: hp('1.9%'),
    marginBottom: hp('1%'),
    color: '#000',
    flexWrap: 'wrap',
  },
  normalText: { fontSize: hp('1.9%'), color: '#000' },
  hashtag: {
    fontSize: hp('1.9%'),
    color: 'rgba(147, 51, 234, 1)',
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: hp('30%'),
    borderRadius: wp('2%'),
    marginTop: hp('1%'),
  },
});

export default FeedPost;
