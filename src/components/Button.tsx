import { Text, Pressable, ViewStyle, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style: ViewStyle;
  disabled?: boolean;
  bg?: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  onPress,
  style,
  disabled,
  bg,
}) => {
  return (
    <Pressable
      onPress={disabled ? () => null : onPress}
      style={{
        opacity: disabled ? 0.5 : 1,
        ...styles.pressableWrapper,
        ...style,
        ...{ backgroundColor: bg || Colors.eucalyptus },
      }}
    >
      <Text style={styles.textWrapper}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
