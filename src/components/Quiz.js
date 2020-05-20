import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import styles from './styles'
import { white, green, red, blue } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

  state = {
    current: 0,
    correct: 0,
    isQuestion: true,
    isResult: false
  }

  submitAnswer(status, deckLength) {
    if (status === 'correct') {
      this.setState((previousState) => ({ correct: previousState.correct + 1 }))
    }

    clearLocalNotification().then(setLocalNotification)

    if (this.state.current === deckLength.length - 1) {
      this.setState(previousState => ({ isResult: true }))
    } else {
      this.setState((previousState) => ({ current: previousState.current + 1 }))
    }
    this.setState(previousState => ({ isQuestion: true }))
  }

  toggleCard() {
    this.setState(previousState => ({ isQuestion: !previousState.isQuestion }))
  }

  restartQuiz() {
    this.setState({
      current: 0,
      correct: 0,
      isQuestion: true,
      isResult: false
    })
  }

  calculatePrecentage(deckQA) {
    let value = (this.state.correct / deckQA.length) * 100
    return (
      parseFloat(value).toFixed(2) + "%"
    )
  }

  render() {

    const { decks, navigation, route } = this.props

    const deckID = route.params.deckID
    const deckQA = decks[deckID].cards

    return (this.state.isResult === false) ? (
      <View style={styles.container}>
        <View>
          <Text style={styles.cardsLeft}>{`Card ${this.state.current + 1} of ${deckQA.length}`}</Text>
        </View>
        <View >
          <Card title={this.state.isQuestion ? ' Question ?' : ' Answer'} >
            <Text style={styles.title, {marginBottom: 10}}>
              {this.state.isQuestion ? deckQA[this.state.current].question : deckQA[this.state.current].answer}
            </Text>
            <Button
              icon={<Icon name='loop' type='material' color={white} />}
              onPress={() => this.toggleCard()}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20, marginBottom: 10}}
              title={this.state.isQuestion ? ' Show Answer' : ' Show Question'} />
          </Card>
        </View>
        <View style={styles.footer}>
          <Button
            icon={<Icon name='check' type='material' color={white} />}
            onPress={() => {this.submitAnswer('correct', deckQA)}}
            buttonStyle={{ backgroundColor:green, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
            title='  Correct' />
          <Button
            icon={<Icon name='close' type='material' color={white} />}
            onPress={() => {this.submitAnswer('incorrect', deckQA)}}
            buttonStyle={{ backgroundColor:red, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='  Incorrect' />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.deck}>
            <Text style={styles.title}>
              Your Result is {this.calculatePrecentage(deckQA)}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
              icon={<Icon name='refresh' type='material' color={white} />}
              onPress={() => this.restartQuiz()}
              buttonStyle={{ backgroundColor:green, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
              title='  Restart Quiz' />
          <Button
              icon={<Icon name='navigate-before' type='material' color={white} />}
              onPress={() => navigation.navigate('DeckDetail', { deckID: deckID })}
              buttonStyle={{ backgroundColor:blue, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='  Back to Deck' />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (props) => {
  return {
    decks: props
  }
}

export default connect(mapStateToProps)(Quiz)
