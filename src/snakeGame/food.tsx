import React, {ReactElement} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface FoodProps {
  position: [number, number];
  size: number;
}

const Food: React.FC<FoodProps> = ({
  position,
  size,
}: FoodProps): ReactElement => {
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
    backgroundColor: 'purple',
    position: 'absolute',
  },
});

export {Food};
