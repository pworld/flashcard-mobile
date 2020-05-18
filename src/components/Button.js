import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  }
})

{/* <RaisedTextButton style={styles.button} rippleDuration={600} rippleOpacity={0.54} title='flat' color='#039BE5' titleColor='{white} /> */}