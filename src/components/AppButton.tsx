import React from 'react';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type AppButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

export function AppButton({ children, onPress }: AppButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 104,
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
});