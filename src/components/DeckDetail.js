import React from 'react'
import { Text, View, Animated } from 'react-native'
import { Card, Button, Icon, Image } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './styles'
import { deleteDeck } from '../actions'
import { removeDeckAPI } from '../utils/api'
import { white, red, green } from '../utils/colors'

class DeckDetail extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  }

  handleDelete = (deckID) => {

    const { decks, deleteDeck } = this.props

    deleteDeck(deckID, decks)
    removeDeckAPI(deckID)
  }

  render() {
    const { decks, navigation, route } = this.props

    const deckID = route.params.deckID
    const deck = decks[deckID]

    if(!deck) navigation.navigate('DeckList')

    return (deck) ? (
      <View style={styles.container}>
        <View style={styles.content}>
          <Card
            title={deck.name}
            >
            <Image
              source={require('../../public/flashcard.png')}
              style={{ width: 150, height: 130 }}
            />
            <Text style={styles.center, {marginBottom: 10}}>
              {deck.cards.length} Cards
            </Text>
            <Button
              icon={<Icon name='zap' type='octicon' color={white} />}
              onPress={() => navigation.navigate('AddCard', { deckID: deckID })}
              buttonStyle={{backgroundColor:green, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title=' Add More Card' />
          </Card>
        </View>
        <View style={styles.footer}>
            {deck.cards.length > 0 ?
              <Button
                icon={<Icon name='play' type='font-awesome' color={white} />}
                onPress={() => navigation.navigate('Quiz', { deckID: deckID })}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                title='  Start Quiz' />
              : null
            }
            <Button
              icon={<Icon name='remove' type='font-awesome' color={white} />}
              onPress={() => {this.handleDelete(deckID)}}
              buttonStyle={{ backgroundColor:red, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='  Delete Deck' />
        </View>
      </View>
    ):(null)
  }
}

const mapStateToProps = (props) => {
  return {
    decks: props
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDeck: (deckID, decks) => {dispatch(deleteDeck(deckID, decks))},
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)