import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../theme/colors';
import { Contact, useContactsList } from '../api/useContactsList';
import { ContactItem, ContactItemProps } from '../components/ContactItem';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppStackRoutes } from '../navigation/routes';
import { AppStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

export const HomeScreen = () => {
  const renderItem = ({ item }: ContactItemProps) => {
    return <ContactItem {...{ item }} />;
  };

  const keyExtractor = (item: Contact) => `${item.id}`;

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { data: contactsList, isLoading } = useContactsList();

  const handleGoToAddUser = () => navigate(AppStackRoutes.UserFormScreen);

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.header}>Contacts List</Text>
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          style={styles.flatListStyles}
          keyExtractor={keyExtractor}
          data={contactsList}
          {...{ renderItem }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyWrapper}>
              <View style={styles.emptyIcon}>
                <AntDesign name='user' size={24} color={Colors.geyser} />
              </View>
              <Text style={styles.emptyText}>
                Your list is currently empty, feel free to add a new contact
              </Text>
            </View>
          }
        />
      )}
      <Button
        text='Add new contact'
        style={styles.buttonStyles}
        onPress={handleGoToAddUser}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
  },
  page: {
    backgroundColor: Colors.shark,
    flex: 1,
  },
  header: {
    marginVertical: 30,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.geyser,
    textAlign: 'center',
  },
  flatListStyles: {
    paddingHorizontal: 15,
  },
  buttonStyles: {
    alignSelf: 'center',
  },
  emptyWrapper: {
    alignItems: 'center',
    opacity: 0.5,
  },
  emptyIcon: {
    backgroundColor: Colors.ebonyClay,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.geyser,
  },
});
