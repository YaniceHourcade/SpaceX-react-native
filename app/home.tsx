import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>SpaceX App</Text>
      <Text style={styles.subtitle}>Home screen temporaire</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#AAAAAA',
    marginTop: 8,
  },
});