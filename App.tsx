import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Home from './pages/home/home';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Shifts from './pages/shifts/shifts';
import Settings from './pages/settings/settings';
import AddJobEntry from './pages/addJobEntry/addJobEntry';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#ecf0f1',
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: '#34495e' },
                tabBarButton: [''].includes(route.name) ? _ => null : undefined,
              })}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Shifts" component={Shifts} />
              <Tab.Screen name="Settings" component={Settings} />
              <Tab.Screen name="AddJobEntry" component={AddJobEntry} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
