import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { BottomTabParamList, RootStackParamList } from './src/types/navigation';

import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';

import { TaskProvider } from './src/context/TaskContext';
import colors from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,

       tabBarStyle: {
            height: 60,

          paddingTop: 6,
          paddingBottom: 6,

          backgroundColor: colors.white,

          borderTopWidth: 0,

          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,

          shadowColor: 'transparent',
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
                },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarIconStyle: {
           marginTop: -2,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },

        tabBarIcon: ({ color, size }) => {
          let icono: keyof typeof Feather.glyphMap = 'check-square';

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
      <Tab.Screen
        name="Tareas"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Ajustes"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Main"
            component={MainTabs}
          />

          <Stack.Screen
            name="TaskForm"
            component={TaskFormScreen}
          />

          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}