import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import { Button } from './button';

export interface SliderItem {
  id: string;
  image: ImageSourcePropType;
  description: string;
}

interface SliderProps {
  items: SliderItem[];
  onComplete: () => void;
  contentOpacity: Animated.Value;
  interactionsEnabled: boolean;
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const logo = require('../../assets/images/spacex-logo-white.png');

export function Slider({ items, onComplete, contentOpacity, interactionsEnabled }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList<SliderItem> | null>(null);

  const handleStartPress = () => {
    if (!interactionsEnabled) {
      return;
    }

    const isLastSlide = currentIndex === items.length - 1;

    if (!isLastSlide) {
      listRef.current?.scrollToOffset({
        offset: WINDOW_WIDTH * (currentIndex + 1),
        animated: true,
      });
      return;
    }

    onComplete();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={items}
        horizontal
        pagingEnabled
        scrollEnabled={interactionsEnabled}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.slideImage}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.description}>{item.description}</Text>
              <Button onPress={handleStartPress}>START</Button>
            </Animated.View>
          </View>
        )}
      />

      <Animated.View style={[styles.dots, { opacity: contentOpacity }]}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[styles.dot, index === currentIndex ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    top: -10,
  },
  slideImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.69,
    top: -10,
  },
  image: {
    width: '100%',
    height: '117%',
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  logo: {
    width: 195,
    height: 24,
    marginLeft: 24,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    width: WINDOW_WIDTH * 3,
  },
  dots: {
    position: 'absolute',
    bottom: 65,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: '#ffffff31',
  },
});