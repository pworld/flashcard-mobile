import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons'

import reducer from './src/reducers'
import { purple, white } from './src/utils/colors'
import { setLocalNotification } from './src/utils/helpers'

import AddCard from './src/components/AddCard'
import DeckAdd from './src/components/DeckAdd'
import DeckList from './src/components/DeckList'
import DeckDetail from './src/components/DeckDetail'
import Quiz from './src/components/Quiz'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNav = () => {
  return (
  <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'ios' ? white : purple,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
  >
    <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Home' }}/>
    <Stack.Screen name="DeckDetail" component={DeckDetail} options={{ title: 'Deck' }}/>
    <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Add Card' }}/>
    <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Start Quiz' }}/>
  </Stack.Navigator>
  )
}

const MainNavigator =  () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? white : purple,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ 
            focused, 
            color, 
            size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'md-home';
            } else if (route.name === 'DeckAdd') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />
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
        <Tab.Screen name="Home" component={StackNav} options={{ title: 'Home' }}/>
        <Tab.Screen name="DeckAdd" component={DeckAdd} options={{ title: 'Create Deck' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}