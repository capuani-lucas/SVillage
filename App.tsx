import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native';

import Home from './pages/home/home';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Settings from './pages/settings/settings';
import { ShiftScreenHandler } from './stackHandler';

const Tab = createBottomTabNavigator();

/*
  TODO: Move tab bar screens to separate components
  TODO: Reduce some code
  TODO: Remove redundancies created half asleep
  TODO: Maybe more intuitve workflow?? Maybe I'll just suffer
* NOTE: I never realized how much anxiety prettier gives me

*/

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
              // Hide pages from navbar
              screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: '#34495e', height: 100 },
                headerTitleStyle: { color: 'white', fontSize: 25 },
                tabBarStyle: { backgroundColor: '#34495e' },
                tabBarButton: ['AddJobEntry'].includes(route.name)
                  ? _ => null
                  : undefined,
              })}>
              <Tab.Screen
                name="The Sports Village"
                key="Home"
                component={Home}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={require('./assets/home.png')}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? 'grey' : 'white',
                      }}
                    />
                  ),
                  tabBarShowLabel: false,
                }}
              />
              <Tab.Screen
                name="Shifts"
                key="Shifts"
                component={ShiftScreenHandler}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={require('./assets/icons8-book-50.png')}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? 'grey' : 'white',
                      }}
                    />
                  ),
                  tabBarShowLabel: false,
                }}
              />
              <Tab.Screen
                name="Settings"
                key="Settings"
                component={Settings}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={require('./assets/icons8-settings-50.png')}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? 'grey' : 'white',
                      }}
                    />
                  ),
                  tabBarShowLabel: false,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
