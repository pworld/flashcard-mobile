export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_ENTRY'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}