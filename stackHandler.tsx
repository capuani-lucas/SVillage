import { createStackNavigator } from '@react-navigation/stack';
import AddJobEntry from './pages/addJobEntry/addJobEntry';
import Shifts from './pages/shifts/shifts';
import React from 'react';
const Stack = createStackNavigator();

const ShiftScreenHandler = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ShiftsHandler" component={Shifts} />
      <Stack.Screen name="AddJobEntry" component={AddJobEntry} />
    </Stack.Navigator>
  );
};

export { ShiftScreenHandler };
