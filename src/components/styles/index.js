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
    padding: 45
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
  amount: {
    textAlign: 'center'
  },
  cardsLeft: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  deckList: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF'
  },
  deckListItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
})

export default styles
