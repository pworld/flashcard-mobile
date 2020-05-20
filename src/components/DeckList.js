import React from 'react'
import { connect } from 'react-redux'
import { getDecksAPI } from '../utils/api'
import { receiveDecks } from '../actions'
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text
  
} from 'react-native'

import { sortTime } from '../utils/helpers'
import { white } from '../utils/colors'

class DeckList extends React.Component {
  componentDidMount() {
    getDecksAPI()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
  }
  _onPress(item) {
    this.props.navigation.navigate('DeckDetail', {
      deckID: item.id
    })
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)} style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.body}>{item.cards.length} cards</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const { decks } = this.props

    const decksArr = sortTime(Object.values(decks))
    return (
      <SafeAreaView style={styles.container}>
        {decksArr.length > 0 ? 
        <FlatList
          data={decksArr}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
        : null
        }
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width:250,
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  title: {
    fontSize: 32,
  },
  body: {
    fontSize: 16,
  },
  header: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
})
function mapStateToProps (decks) {
  return {
    decks
  }
}


export default connect(mapStateToProps)(DeckList)