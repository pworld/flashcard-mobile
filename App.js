import * as React from 'react'
import Constants from 'expo-constants';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { View, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons'

import reducer from './src/reducers'
import { purple, white } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers'

import AddCard from './src/components/AddCard'
import AddDeck from './src/components/AddDeck'
import ListDeck from './src/components/ListDeck'
import Quiz from './src/components/Quiz'

const HeadStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNav = () => {
  return (
  <Stack.Navigator>
    <Stack.Screen name="List Deck" component={ListDeck} />
    <Stack.Screen name="Add Card" component={AddCard} />
    <Stack.Screen name="Quiz" component={Quiz} />
  </Stack.Navigator>
  )
}

const MainNavigator =  () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Add Deck') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Platform.OS === 'ios' ? purple : white,
          style: {
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
        }}
      >
        <Tab.Screen name="Home" component={StackNav} />
        <Tab.Screen name="Add Deck" component={AddDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <HeadStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    </Provider>
  );
}