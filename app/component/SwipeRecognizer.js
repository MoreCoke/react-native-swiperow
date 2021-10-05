import React from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const swipeConfig = {
  velocityThreshold: 0,
  directionalOffsetThreshold: 80,
};

export const swipeDirections = {
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

export default function SwipeRecognizer(props) {
  const config = Object.assign(swipeConfig, props.config);

  /**
   * @param {HandlerStateChangeEvent} nativeEvent
   */

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      handleSwipeEvent(nativeEvent);
    }
  };

  const handleSwipeEvent = ev => {
    const direction = getSwipeDirection(ev);
    const {onSwipe, onSwipeLeft, onSwipeRight} = props;
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    onSwipe && onSwipe(ev);
    switch (direction) {
      case SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(ev);
        break;
      case SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(ev);
        break;
    }
  };

  const getSwipeDirection = ev => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    const {translationX} = ev;
    if (isValidHorizontalSwipe(ev)) {
      return translationX > 0 ? SWIPE_RIGHT : SWIPE_LEFT;
    }
    return null;
  };

  const isValidHorizontalSwipe = ev => {
    const {velocityX, translationY} = ev;
    const {velocityThreshold, directionalOffsetThreshold} = config;
    return isValidSwipe(
      velocityX,
      velocityThreshold,
      translationY,
      directionalOffsetThreshold,
    );
  };

  /**
   * @param {Number} velocity 滑動速率
   * @param {Number} velocityThreshold 沒超過速率上限視為無效滑動
   * @param {Number} directionalOffset 手指移動距離
   * @param {Number} directionalOffsetThreshold 沒超過距離上限視為無效滑動
   * @returns
   */

  const isValidSwipe = (
    velocity,
    velocityThreshold,
    directionalOffset,
    directionalOffsetThreshold,
  ) => {
    return (
      Math.abs(velocity) >= velocityThreshold &&
      Math.abs(directionalOffset) < directionalOffsetThreshold
    );
  };

  return (
    <PanGestureHandler
      {...props}
      // minDist={80}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetX={[-10, 10]}>
      {props.children}
    </PanGestureHandler>
  );
}
