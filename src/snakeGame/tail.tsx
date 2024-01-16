import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Constants} from '../constant';

interface TailProps {
  size: number;
  elements: number[][];
}

const Tail: React.FC<TailProps> = ({
  size,
  elements,
}: TailProps): ReactElement => {
  const tailList = elements.map((el, idx) => {
    const width = size;
    const height = size;
    const left = el[0] * size;
    const top = el[1] * size;
    return <View key={idx} style={[styles.tail, {width, height, left, top}]} />;
  });

  return (
    <View
      style={{
        width: Constants.GRID_SIZE * size,
        height: Constants.GRID_SIZE * size,
      }}>
      {tailList}
    </View>
  );
};

const styles = StyleSheet.create({
  tail: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
});

export {Tail};
