import React from 'react'
import { connect } from 'react-redux'
import { getDecksAPI } from '../utils/api'
import { receiveDecks } from '../actions'
import { ScrollView, Text, Animated } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import { sortTime } from '../utils/helpers'
import { white } from '../utils/colors'

class DeckList extends React.Component {
ponentDidMount() {
    getDecksAPI()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
  }
  _onPress(item) {
    
    this.props.navigation.navigate('DeckDetail', {
      deckID: item.id
    })
  }

  render() {
    const { decks } = this.props

    const decksArr = sortTime(Object.values(decks))

    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        {decksArr.map((item, i) => (
          <Card
            key={i}
            title={item.name}
            >
            <Text style={{marginBottom: 10}}>
              {`This Deck has ${item.cards.length} cards`}
            </Text>
            <Button
              icon={<Icon name='search' type='material' color={white} />}
              onPress={() => this._onPress(item)}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW' />
          </Card>
        ))}        
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)