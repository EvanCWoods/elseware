import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../config/theme';

interface VUMeterProps {
  level: Animated.Value;
}

export function VUMeter({ level }: VUMeterProps) {
  const widthInterpolation = level.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, { width: widthInterpolation }]}>
          <LinearGradient
            colors={[theme.pastelGreen, theme.pastelPeach, theme.pastelPink]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 4,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e8e4de',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
});
