import { 
  RECEIVE_DECKS,
  DELETE_DECK, 
  ADD_DECK, 
  ADD_CARD
} from '../actions'
import {objArr} from '../utils/helpers'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK:
      return objArr(Object.values(action.decks).filter((deck) => deck.id !== action.deckID))
    case ADD_CARD :
      const {deckID, card} = action
      return {
        ...state,
        [deckID]: {
          ...state[deckID],
          cards: state[deckID].cards.concat(card)
        }
      }
    default :
      return state
  }
}

export default decks