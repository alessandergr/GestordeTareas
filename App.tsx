import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { TaskProvider } from './src/context/TaskContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// Diseno de nuetro home
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6A3CE8',
        tabBarInactiveTintColor: '#999999',

        tabBarIcon: ({ color, size }) => {
          let icono: any = 'check-square';

          if (route.name === 'Ajustes') {
            icono = 'settings';
          }

          return <Feather name={icono} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Tareas" component={HomeScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

//Aqui nos movemos y aparte nos dejan tambien usar el CRUD//
export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}