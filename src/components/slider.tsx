import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ImageSourcePropType,
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
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const logo = require('../../assets/images/spacex-logo-white.png');

export function Slider({ items, onComplete }: SliderProps) {
  const flatListRef = useRef<FlatList<SliderItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStartPress = () => {
    const isLastSlide = currentIndex === items.length - 1;

    if (!isLastSlide) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
      return;
    }

    onComplete();
  };

  const handleMomentumScrollEnd = ({
    nativeEvent,
  }: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const index = Math.round(nativeEvent.contentOffset.x / WINDOW_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.slideImage}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.content}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.description}>{item.description}</Text>
              <Button onPress={handleStartPress}>START</Button>
            </View>
          </View>
        )}
      />

      <View style={styles.dots}>
        {items.map((slide, index) => (
          <View
            key={slide.id}
            style={[styles.dot, index === currentIndex ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
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
