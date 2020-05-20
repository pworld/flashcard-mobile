import React from "react"
import { View, KeyboardAvoidingView } from "react-native"
import { compose } from "recompose"
import { Formik } from "formik"
import { connect } from 'react-redux'
import * as Yup from "yup"
import { Input, Text, Button } from 'react-native-elements'
import { handleTextInput } from "react-native-formik"

import { generateUID } from '../utils/helpers'
import { addDeck } from '../actions'
import styles from './styles'
import { saveDeckAPI } from '../utils/api'


const DeckInput = compose(
  handleTextInput
)(Input)

const validationSchema = Yup.object().shape({
    deck: Yup.string()
    .required()
    .min(3, "Minimum 3 characters")
})

class DeckAdd extends React.Component {

  submithandler = (values, resetForm) => {

    const id = generateUID()
    const deck = {
      [id] : {
        id: id,
        name:values.deck,
        cards:[],
        timestamp:Date.now()
      }
    }
    saveDeckAPI(id,deck[id])
    this.props.addDeck(deck)

    resetForm({deck: ''})

    this.props.navigation.navigate('DeckList')
  }

  render() {

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{deck: ''}}
        validationSchema={validationSchema}
        onSubmit={(values,{resetForm}) => this.submithandler(values,resetForm)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (

            <View style={styles.content}>
              <Text style={[styles.title, {marginBottom: 30}]}>What is the title of your deck?</Text>
              <DeckInput 
                label="Deck Name"
                placeholder="Deck"
                errorStyle={{ color: 'red' }}
                errorMessage={touched.deck && errors.deck}
                onChangeText={handleChange('deck')}
                value={values.deck || ''}  />

              <Button 
                onPress={handleSubmit} 
                icon={{name: 'sc-telegram', type: 'evilicon' }} 
                title="Submit" 
                containerStyle={{width: 150}}
                buttonStyle={{backgroundColor:'#115cd4'}} />
            </View>

        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addDeck: (deck) => {dispatch(addDeck(deck))},
})

export default connect(null, mapDispatchToProps)(DeckAdd)