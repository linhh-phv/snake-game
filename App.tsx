import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {GameEngine, dispatch} from 'react-native-game-engine';
import {GameLoop} from './src/util/snakeMove';
import {Head, Food, Tail} from './src/snakeGame';
import {Constants} from './src/constant';

const App: React.FC = () => {
  const boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engineRef = useRef<GameEngine | null>(null);
  const [running, setRunning] = useState(true);

  const randomBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const onEvent = (e: {type: string}): void => {
    if (e.type === 'game-over') {
      setRunning(false);
      Alert.alert('Game Over');
    }
  };

  const reset = (): void => {
    engineRef.current?.swap({
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        size: 20,
        renderer: <Head />,
      },
      food: {
        position: [
          randomBetween(0, Constants.GRID_SIZE - 1),
          randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: 20,
        renderer: <Food />,
      },
      tail: {size: 20, elements: [], renderer: <Tail />},
    });
    setRunning(true);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={ref => {
          engineRef.current = ref;
        }}
        style={[
          {
            width: boardSize,
            height: boardSize,
            backgroundColor: '#ffffff',
            flex: null,
          },
        ]}
        systems={[GameLoop]}
        entities={{
          head: {
            position: [0, 0],
            xspeed: 1,
            yspeed: 0,
            nextMove: 10,
            updateFrequency: 10,
            size: 20,
            renderer: <Head />,
          },
          food: {
            position: [
              randomBetween(0, Constants.GRID_SIZE - 1),
              randomBetween(0, Constants.GRID_SIZE - 1),
            ],
            size: 20,
            renderer: <Food />,
          },
          tail: {size: 20, elements: [], renderer: <Tail />},
        }}
        running={running}
        onEvent={onEvent}>
        <StatusBar hidden={true} />
      </GameEngine>

      <Button title="New Game" onPress={reset} />

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engineRef.current?.dispatch({type: 'move-up'});
            }}>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engineRef.current?.dispatch({type: 'move-left'});
            }}>
            <View style={styles.control} />
          </TouchableOpacity>
          <View style={[styles.control, {backgroundColor: null}]} />
          <TouchableOpacity
            onPress={() => {
              engineRef.current?.dispatch({type: 'move-right'});
            }}>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => {
              engineRef.current?.dispatch({type: 'move-down'});
            }}>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default App;
