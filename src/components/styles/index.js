import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  footer: {
    padding: 30
  },
  title: {
    color: '#141823',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#666'
  },
  toggle: {
    padding: 5,
    color: '#999',
    textAlign: 'center'
  },
  center: {
    textAlign: 'center'
  },
  cardsLeft: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default styles
