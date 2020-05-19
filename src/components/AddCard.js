import React from "react"
import { View } from "react-native"
import { compose } from "recompose"
import { Formik } from "formik"
import { connect } from 'react-redux'
import * as Yup from "yup"
import { Input, Text, Button } from 'react-native-elements'
import { 
  handleTextInput, 
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm } from "react-native-formik"

import { addCard } from '../actions'
import styles from './styles'

const CardInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(Input)

const Form = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
    question: Yup.string()
    .required()
    .min(3, "Minimum 3 characters"),
    answer: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

class AddCard extends React.Component {

  submithandler = (values, resetForm) => {

    const { route, navigation, addCard } = this.props
    const deckID = route.params.deckID

    const card = {
      question:values.question,
      answer:values.answer,
    }

    addCard(deckID, card)
    resetForm()
    navigation.navigate('DeckDetail', {
      deckID: deckID
    })
  }

  render() {

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          question: '',
          answer: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values,{resetForm}) => this.submithandler(values,resetForm)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (

            <Form style={styles.content}>
              <Text style={[styles.title, {marginBottom: 30}]}>Add New Card</Text>
              <CardInput 
                label="Question?"
                placeholder="Question"
                errorStyle={{ color: 'red' }}
                errorMessage={touched.question && errors.question}
                onChangeText={handleChange('question')}
                value={values.question || ''}  />

              <CardInput 
                label="Answer Name"
                placeholder="Answer"
                errorStyle={{ color: 'red' }}
                errorMessage={touched.answer && errors.answer}
                onChangeText={handleChange('answer')}
                value={values.answer || ''}  />

              <Button 
                onPress={handleSubmit} 
                icon={{name: 'sc-telegram', type: 'evilicon' }} 
                title="Submit" 
                containerStyle={{width: 150}}
                buttonStyle={{backgroundColor:'#115cd4'}} />
            </Form>

        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: (deckID, card) => {dispatch(addCard(deckID,card))},
})


export default connect(null, mapDispatchToProps)(AddCard)