import React, {ReactElement} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface HeadProps {
  position: [number, number];
  size: number;
}

const Head: React.FC<HeadProps> = ({
  position,
  size,
}: HeadProps): ReactElement => {
  const x = position[0];
  const y = position[1];

  const dynamicStyles: ViewStyle = {
    width: size,
    height: size,
    left: x * size,
    top: y * size,
  };

  return <View style={[styles.finger, dynamicStyles]} />;
};

const styles = StyleSheet.create({
  finger: {
    backgroundColor: '#888888',
    position: 'absolute',
  },
});

export {Head};
