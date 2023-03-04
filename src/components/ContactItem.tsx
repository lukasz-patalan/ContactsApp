import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { Contact } from '../api/useContactsList';
import { Colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDeleteContact } from '../api/useDeleteContact';
import { useQueryClient } from 'react-query';
import { AppStackRoutes } from '../navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { showToast } from '../helpers/showToast';

export interface ContactItemProps {
  item: Contact;
}
export const ContactItem: FC<ContactItemProps> = ({ item }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteContact } = useDeleteContact(item.id, {
    onSuccess: () => {
      showToast(`Contact: ${item.name} ${item.lastName} deleted`);

      queryClient.invalidateQueries('contactsList');
    },
  });
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const handleDeleteContact = () => deleteContact();

  const handleEditContact = () =>
    navigate(AppStackRoutes.UserFormScreen, { user: item });

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoContentWrapper}>
        <View style={styles.avatarWrapper}>
          <AntDesign name='user' size={24} color={Colors.geyser} />
        </View>
        <View>
          <Text
            style={[styles.itemValue, styles.contactName]}
          >{`${item.name} ${item.lastName}`}</Text>
          <View style={styles.contentItemWrapper}>
            <AntDesign name='phone' size={20} color={Colors.geyser} />
            <Text style={styles.itemValue}>{item.phoneNumber}</Text>
          </View>
          <View style={styles.contentItemWrapper}>
            <MaterialIcons name='email' size={20} color={Colors.geyser} />
            <Text style={styles.itemValue}>{item.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionButtonsWrapper}>
        <Pressable
          onPress={handleDeleteContact}
          style={[
            styles.pressableWrapper,
            {
              borderColor: Colors.burntSienna,
            },
          ]}
        >
          <AntDesign name='closecircle' size={20} color={Colors.geyser} />
        </Pressable>
        <Pressable
          onPress={handleEditContact}
          style={[
            styles.pressableWrapper,
            {
              borderColor: Colors.selectiveYellow,
            },
          ]}
        >
          <Feather name='edit' size={20} color={Colors.geyser} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor: Colors.ebonyClay,
  },
  itemValue: {
    color: Colors.geyser,
    marginLeft: 5,
    fontSize: 12,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(240,240,240, 0.2)',
    borderRadius: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  contentItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  actionButtonsWrapper: {
    justifyContent: 'space-between',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  pressableWrapper: {
    width: 34,
    height: 34,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 8,
  },
  infoContentWrapper: {
    flexDirection: 'row',
  },
});
