// ... existing imports ...
import {
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import Video from 'react-native-video';
import ReelActions from './ReelAction';
import ReelFooter from './ReelFooter';

const ReelVideoPlayer = ({ reel, isVisible }) => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { height } = useWindowDimensions();

  // Pause/play and progress states
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);

  const videoStyle = useMemo(() => styles.videoo(height), [height]);

  // Reset pause state when video becomes visible
  useEffect(() => {
    if (isVisible) {
      setPaused(false); // auto-play when visible
    } else {
      setPaused(true); // always pause when not visible
    }
  }, [isVisible]);

  // Handle tap to pause/play
  const handleVideoPress = () => {
    if (isVisible) setPaused(prev => !prev);
  };

  // Handle progress update
  const handleProgress = progress => {
    if (!isSeeking) {
      setCurrentTime(progress.currentTime);
    }
  };

  // Handle video load
  const handleLoad = meta => {
    setDuration(meta.duration);
    setIsLoading(false);
  };

  // Handle seek
  const handleSlidingStart = () => setIsSeeking(true);
  const handleSlidingComplete = value => {
    setIsSeeking(false);
    setCurrentTime(value);
    videoRef.current?.seek(value);
  };

  // If not visible, always pause
  const effectivePaused = paused || !isVisible;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleVideoPress}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: reel.videoUrl }}
            style={videoStyle}
            resizeMode="cover"
            repeat
            paused={effectivePaused}
            muted={false}
            ignoreSilentSwitch="ignore"
            onLoadStart={() => setIsLoading(true)}
            onBuffer={({ isBuffering }) => setIsLoading(isBuffering)}
            onReadyForDisplay={() => setIsLoading(false)}
            onError={e => {
              console.warn('Video Error:', e);
              setIsLoading(false);
            }}
            onProgress={handleProgress}
            onLoad={handleLoad}
          />
          {/* Loading Spinner */}
          {isLoading && (
            <View style={styles.loaderWrapper}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Video Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={duration}
          value={isSeeking ? seekTime : currentTime}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#888"
          thumbTintColor="transparent"
          onValueChange={value => {
            setSeekTime(value);
          }}
          onSlidingStart={handleSlidingStart}
          onSlidingComplete={handleSlidingComplete}
        />
      </View>

      {/* Overlay UI */}
      <ReelActions
        onPressComments={() => navigation.navigate('Comments')}
        onPressShare={() => navigation.navigate('Feed')}
        profile={reel.user.avatar}
        likes={reel.likes}
        comments={reel.comments}
        shares={reel.shares}
      />
      <ReelFooter
        name={reel.user.name}
        caption={reel.caption}
        location={reel.location}
      />
    </View>
  );
};

export default ReelVideoPlayer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  videoo: height => ({
    backgroundColor: 'black',
    width: '100%',
    height: Platform.OS === 'ios' ? height : height - 50,
  }),
  loaderWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    justifyContent: 'center',
    // paddingHorizontal: 10,
    zIndex: 20,
  },
});
