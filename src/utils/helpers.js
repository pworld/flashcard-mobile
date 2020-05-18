import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Flashcard:notifications'

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  return false
  // AsyncStorage.getItem(NOTIFICATION_KEY)
  //   .then(JSON.parse)
  //   .then((data) => {
  //     if (data === null) {
  //       Permissions.askAsync(Permissions.NOTIFICATIONS)
  //         .then(({ status }) => {
  //           if (status === 'granted') {
  //             Notifications.cancelAllScheduledNotificationsAsync()

  //             let tomorrow = new Date()
  //             tomorrow.setDate(tomorrow.getDate() + 1)
  //             tomorrow.setHours(20)
  //             tomorrow.setMinutes(0)

  //             Notifications.scheduleLocalNotificationAsync(
  //               createNotification(),
  //               {
  //                 time: tomorrow,
  //                 repeat: 'day',
  //               }
  //             )

  //             AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
  //           }
  //         })
  //     }
  //   })
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})