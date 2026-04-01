import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function BackgroundShapes() {
  return (
    <View style={styles.container} pointerEvents="none">
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        viewBox={`0 0 ${SCREEN_WIDTH} ${SCREEN_HEIGHT}`}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <SvgGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#b8b0d8" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#a8bce0" stopOpacity="0.2" />
          </SvgGradient>
          <SvgGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#a688b5" stopOpacity="0.15" />
            <Stop offset="1" stopColor="#a0d4c8" stopOpacity="0.1" />
          </SvgGradient>
          <SvgGradient id="blob1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#f0c8a8" stopOpacity="0.25" />
            <Stop offset="1" stopColor="#e8b8b8" stopOpacity="0.15" />
          </SvgGradient>
          <SvgGradient id="blob2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#a0d4c8" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#a8d4b2" stopOpacity="0.1" />
          </SvgGradient>
        </Defs>

        {/* Top wave */}
        <Path
          d={`M0 0 L${SCREEN_WIDTH} 0 L${SCREEN_WIDTH} 120 Q${SCREEN_WIDTH * 0.75} 80 ${SCREEN_WIDTH * 0.5} 100 Q${SCREEN_WIDTH * 0.25} 120 0 90 Z`}
          fill="url(#wave1)"
        />

        {/* Second wave */}
        <Path
          d={`M0 60 Q${SCREEN_WIDTH * 0.3} 110 ${SCREEN_WIDTH * 0.6} 90 Q${SCREEN_WIDTH * 0.85} 70 ${SCREEN_WIDTH} 100 L${SCREEN_WIDTH} 140 Q${SCREEN_WIDTH * 0.6} 160 ${SCREEN_WIDTH * 0.3} 140 Q0 120 0 60 Z`}
          fill="url(#wave2)"
        />

        {/* Peach blob - bottom right */}
        <Ellipse
          cx={SCREEN_WIDTH * 0.85}
          cy={SCREEN_HEIGHT * 0.7}
          rx={120}
          ry={100}
          fill="url(#blob1)"
        />

        {/* Teal blob - bottom left */}
        <Ellipse
          cx={SCREEN_WIDTH * 0.15}
          cy={SCREEN_HEIGHT * 0.85}
          rx={100}
          ry={80}
          fill="url(#blob2)"
        />

        {/* Lavender blob - mid right */}
        <Ellipse
          cx={SCREEN_WIDTH * 0.9}
          cy={SCREEN_HEIGHT * 0.35}
          rx={80}
          ry={90}
          fill="#b8b0d8"
          opacity={0.12}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
