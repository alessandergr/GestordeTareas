import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { TaskProvider } from './src/context/TaskContext';
import colors from './src/theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,

        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,

          height: 65,

          borderRadius: 20,

          backgroundColor: colors.white,

          elevation: 8,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,

          borderTopWidth: 0,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let icono: any = 'check-square';

          if (route.name === 'Ajustes') {
            icono = 'settings';
          }

          return (
            <Feather
              name={icono}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Tareas" component={HomeScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

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