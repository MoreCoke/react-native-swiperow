import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const ActionWidth = 40;

const EditButton = props => (
  <RectButton
    onPress={props.onPress}
    style={[styles.btnLayout, {backgroundColor: 'blue'}]}>
    <Text style={styles.btnTxt}>編輯</Text>
  </RectButton>
);

const DeleteButton = props => (
  <RectButton
    onPress={props.onPress}
    style={[styles.btnLayout, {backgroundColor: 'red'}]}>
    <Text style={styles.btnTxt}>刪除</Text>
  </RectButton>
);

class SwipeRow extends Component {
  static defaultProps = {
    actions: [],
    onEditPress: () => {},
    onDeletePress: () => {},
  };
  constructor(props) {
    super(props);
    this.swipeRowRef = React.createRef();
  }

  close = () => {
    this.swipeRowRef.current?.close();
  };

  onEditPress = () => {
    this.props.onEditPress();
    this.close();
  };

  onDeletePress = () => {
    this.props.onDeletePress();
    this.close();
  };

  renderRightActions = (progress, dragX) => {
    const x = ActionWidth * this.props.actions.length;
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    return (
      <Animated.View
        style={[{flexDirection: 'row'}, {transform: [{translateX: trans}]}]}>
        <EditButton onPress={this.onEditPress} />
        <DeleteButton onPress={this.onDeletePress} />
      </Animated.View>
    );
  };

  render() {
    return (
      <>
        <Swipeable
          ref={this.swipeRowRef}
          containerStyle={styles.swipeLayout}
          renderRightActions={this.renderRightActions}
          friction={2}>
          <Text>可滑動的</Text>
        </Swipeable>
      </>
    );
  }
}

const styles = StyleSheet.create({
  swipeLayout: {
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  btnLayout: {
    width: ActionWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SwipeRow;
