import React from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text
  
} from 'react-native';

import { white } from '../utils/colors'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    deck: 'First Item',
    deckTotal: '1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    deck: 'Second Item',
    deckTotal: '2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    deck: 'Third Item',
    deckTotal: '3',
  },
];

class ListDeck extends React.Component {

  _onPress(item) {
    this.props.navigation.navigate('Add Card', {
      itemId: item.id,
      title: item.deck,
    });
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)} style={styles.item}>
        <Text style={styles.title}>{item.deck}</Text>
        <Text style={styles.body}>{item.deckTotal} cards</Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { decks, navigation } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
    );
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

export default connect(mapStateToProps)(ListDeck)