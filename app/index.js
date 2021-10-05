/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SwipeRow from 'app/component/SwipeRow';
import SwipeRecognizer from 'app/component/SwipeRecognizer';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SwipeRow
          onEditPress={() => alert('編輯')}
          onDeletePress={() => alert('刪除')}
          actions={['Edit', 'Delete']}
        />
        <SwipeRecognizer
          onSwipeLeft={e => {
            console.log('swipeLeft: ', e);
          }}
          onSwipeRight={e => console.log('swipeRight: ', e)}>
          <View style={{height: 400}}>
            <Text>Hello world</Text>
          </View>
        </SwipeRecognizer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
