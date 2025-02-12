// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TaskProvider } from './src/context/TaskContext';
// import TodoScreen from './src/screens/TodoScreen';
// import PostsScreen from './src/screens/PostsScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <TaskProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="To-Do List" component={TodoScreen} />
//           <Stack.Screen name="Posts Lists" component={PostsScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </TaskProvider>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';
import PostsScreen from './src/screens/PostsScreen';
import { TaskProvider } from './src/context/TaskContext';


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#82B1FF" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: '#82B1FF' }, // Header color
            tabBarIndicatorStyle: { backgroundColor: 'white', height: 3 }, // Active tab underline
            tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', color: 'white' }, // Tab text
          }}
        >
          <Tab.Screen name="To-Do List" component={TodoScreen} />
          <Tab.Screen name="Posts List" component={PostsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}
