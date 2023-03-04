import {
  View,
  Text,
  TextInput,
  ViewStyle,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../theme/colors';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  error?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const Input: FC<InputProps> = ({
  label,
  value,
  onChangeText,
  style,
  error,
  keyboardType,
}) => {
  return (
    <View style={{ width: '100%' }}>
      {label ? (
        <Text
          style={{
            ...styles.inputLabel,
            color: error ? Colors.burntSienna : Colors.geyser,
          }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        keyboardType={keyboardType || undefined}
        {...{ value, onChangeText }}
        style={{
          ...styles.inputWrapper,
          ...style,
          borderColor: error ? Colors.burntSienna : Colors.baliHai,
          color: error ? Colors.burntSienna : Colors.geyser,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontWeight: 'bold',

    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: Colors.ebonyClay,
    width: '100%',
    borderRadius: 10,
    height: 45,
    paddingLeft: 10,

    borderWidth: 1,
  },
});
