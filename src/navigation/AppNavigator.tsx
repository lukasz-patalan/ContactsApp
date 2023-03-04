import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackRoutes } from './routes';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../theme/colors';
import { UserFormScreen } from '../screens/UserFormScreen';
import { Pressable } from 'react-native';
import { Contact } from '../api/useContactsList';

export type AppStackParamList = {
  HomeScreen: undefined;
  UserFormScreen:
    | {
        user: Contact;
      }
    | undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

const baseOptions = (navigation: any) => ({
  headerTitleStyle: { color: Colors.white },
  headerStyle: { backgroundColor: Colors.shark, shadowColor: 'transparent' },
  headerLeft: () => (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons name='arrow-back-outline' size={24} color={Colors.eucalyptus} />
    </Pressable>
  ),
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={AppStackRoutes.HomeScreen}
        screenOptions={({ navigation }) => baseOptions(navigation)}
      >
        <Screen
          options={{ headerShown: false }}
          name={AppStackRoutes.HomeScreen}
          component={HomeScreen}
        />
        <Screen
          options={{ headerTitle: 'Contact Form' }}
          name={AppStackRoutes.UserFormScreen}
          component={UserFormScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
