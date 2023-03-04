import { View, StyleSheet, Pressable, Keyboard, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../theme/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Contact } from '../api/useContactsList';
import { useAddContact } from '../api/useAddContact';
import { useQueryClient } from 'react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEditContact } from '../api/useEditContact';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '../navigation/AppNavigator';

const fields = ['name', 'lastName', 'email', 'phoneNumber'];

export const UserFormScreen = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  const route = useRoute<RouteProp<AppStackParamList>>();
  const userToEdit = route.params?.user;

  const [newUser, setNewUser] = useState<Omit<Contact, 'id'>>({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    if (userToEdit !== undefined) {
      setNewUser({
        name: userToEdit.name,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        phoneNumber: userToEdit.phoneNumber,
      });
    }
  }, []);

  const handleSuccess = () => {
    setError('');
    queryClient.invalidateQueries('contactsList');
    navigate.goBack();
  };

  const onChangeText = (key: string, text: string) =>
    setNewUser((prev) => ({ ...prev, [key]: text }));

  const { mutate: addUser } = useAddContact(newUser, {
    onSuccess: () => handleSuccess(),
    onError: (error) => {
      setError(error.response?.data?.message);
    },
  });
  const { mutate: editUser } = useEditContact(
    userToEdit?.id as string,
    newUser,
    {
      onSuccess: () => handleSuccess(),
      onError: (error) => setError(error.response?.data?.message),
    }
  );

  const userToEditDisabled =
    userToEdit?.name === newUser.name &&
    newUser?.lastName === userToEdit.lastName &&
    newUser?.email === userToEdit.email &&
    userToEdit.phoneNumber === newUser.phoneNumber;

  const newUserDisabled =
    !newUser.phoneNumber ||
    !newUser.email ||
    !newUser.lastName ||
    !newUser.name;

  const isDisabled = userToEdit ? userToEditDisabled : newUserDisabled;

  return (
    <SafeAreaView style={styles.page}>
      <Pressable
        style={styles.keyBoardWrapper}
        onPress={() => Keyboard.dismiss()}
      >
        {fields.map((el) => {
          const field = el.replace(/([A-Z])/g, ' $1');
          const fieldFormatted =
            el
              .replace(/([A-Z])/g, ' $1')
              .charAt(0)
              .toUpperCase() + field.slice(1);
          return (
            <Input
              keyboardType={
                el === 'phoneNumber' ? 'numbers-and-punctuation' : undefined
              }
              error={error?.includes(fieldFormatted.toLowerCase())}
              key={el}
              label={fieldFormatted}
              style={styles.inputStyles}
              onChangeText={(text) => {
                setError('');
                onChangeText(el, text);
              }}
              value={newUser[el as keyof Omit<Contact, 'id'>]}
            />
          );
        })}

        <View style={styles.separator} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          iconName='save'
          bg={userToEdit && Colors.selectiveYellow}
          style={styles.buttonStyles}
          text='Save'
          onPress={userToEdit ? editUser : addUser}
          disabled={isDisabled}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.shark,
    flex: 1,
    alignItems: 'center',
  },
  inputStyles: {
    marginBottom: 20,
  },
  keyBoardWrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
  errorText: {
    color: Colors.burntSienna,
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  separator: {
    flex: 1,
  },
  buttonStyles: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});
