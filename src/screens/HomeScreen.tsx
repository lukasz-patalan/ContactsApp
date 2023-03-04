import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../theme/colors';
import { Contact, useContactsList } from '../api/useContactsList';
import { ContactItem, ContactItemProps } from '../components/ContactItem';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppStackRoutes } from '../navigation/routes';
import { AppStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filters } from '../components/Filters';
import { getSortedArray } from '../helpers/sortArray';

export const HomeScreen = () => {
  const [isSorted, setIsSorted] = useState(false);

  const renderItem = ({ item }: ContactItemProps) => {
    return <ContactItem {...{ item }} />;
  };

  const keyExtractor = (item: Contact) => `${item.id}`;

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { data: contactsList, isLoading, refetch } = useContactsList();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleGoToAddUser = () => navigate(AppStackRoutes.UserFormScreen);

  const data = isSorted ? getSortedArray(contactsList) : contactsList;

  useEffect(() => {
    if (contactsList && contactsList.length < 2) {
      setIsSorted(false);
    }
  }, [contactsList]);

  const onRefresh = () => {
    setIsRefreshing(true);
    refetch();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.header}>Contacts List</Text>
      <Filters
        {...{ isSorted, setIsSorted }}
        enabled={Boolean(contactsList && contactsList.length > 1)}
      />
      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              {...{ onRefresh }}
              tintColor={Colors.geyser}
            />
          }
          refreshing={isRefreshing}
          style={styles.flatListStyles}
          {...{ renderItem, keyExtractor, data }}
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
        iconName='adduser'
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
    marginBottom: 15,
    marginTop: 30,
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
    marginVertical: 10,
    alignSelf: 'center',
  },
  emptyWrapper: {
    alignItems: 'center',
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
