import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { Dispatch, FC } from 'react';
import Checkbox from 'expo-checkbox';
import { Colors } from '../theme/colors';

interface FiltersProps {
  isSorted: boolean;
  setIsSorted: Dispatch<React.SetStateAction<boolean>>;
  enabled: boolean;
}
export const Filters: FC<FiltersProps> = ({
  isSorted,
  setIsSorted,
  enabled,
}) => {
  return (
    <Pressable
      onPress={() => (enabled ? setIsSorted((prev) => !prev) : null)}
      style={[
        styles.wrapper,
        {
          opacity: enabled ? 1 : 0.5,
        },
      ]}
    >
      <View style={styles.checkboxWrapper}>
        <Checkbox
          color={Colors.eucalyptus}
          value={isSorted}
          onValueChange={setIsSorted}
        />
        <Text style={styles.checkboxText}>sort by name A-Z</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: Colors.ebonyClay,
    width: 180,
    marginLeft: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: Colors.white,
    marginLeft: 10,
  },
});
