import React, { useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

const DropDown: React.FC<{
  title: string;
  children: React.ReactNode;
  textStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}> = ({ title, children, style, textStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openAnimation = useRef(new Animated.Value(0)).current;

  const height = openAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const rotation = openAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `45deg`],
  });

  const toggleOpen = () => {
    Animated.timing(openAnimation, {
      duration: 150,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleOpen}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            style,
          ]}>
          <Text style={textStyle}>{title}</Text>

          <Animated.Text
            style={{
              color: '#34495e',
              fontSize: 22,
              transform: [{ rotateZ: rotation }],
            }}>
            +
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={{ height: height }}>
        {children}
        {/* <View onLayout={updateHeight}></View> */}
      </Animated.View>
    </>
  );
};

export default DropDown;
