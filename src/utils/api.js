import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'FlashCards:decks'

export function getDecksAPI() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => JSON.parse(results))
}

export function removeDeckAPI(key) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined

      delete data[key]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveDeckAPI(id, deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [id]:deck
  }))
}

export function addCardToDeckAPI( key, cards ) { 
  return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    const parse = JSON.parse(result)
    const oldQuestions = parse[key].cards
    const newQuestion = [...oldQuestions, ...cards]
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [key]: {
        cards: newQuestion
      }
    }))
  })
}
