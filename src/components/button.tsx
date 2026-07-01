import { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

export function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
      <Image source={require('../../assets/images/Arrow.png')} style={styles.arrow} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 140,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'RobotoCondensed_800ExtraBold',
    letterSpacing: 1.5
  },
  arrow: {
    width: 16.5,
    height: 12,
  },
});