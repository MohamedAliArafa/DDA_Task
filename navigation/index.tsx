import React from 'react';
import { Alert, ColorSchemeName } from 'react-native';
import LiquidSwipe from '../LiquidSwipe';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import moment from 'moment';

// Redux Initial State
const initialState = {
  entries: [
  ]
}

// Redux Reducer
const reducer = (state = initialState, action) => {
  console.log(action);
  switch(action.type){
    // Add Item Action
    case "ADD_ITEM":
      let todayItems = state.entries.filter(item => moment(item.dateAdd).isSame(Date.now(), 'day'));
      if (todayItems.length > 4) {
        Alert.alert("Error", "Exceeded Daily Entries")
        return {
          entries: state.entries
        }
      } else {
        Alert.alert("Thank You", "Thank you for your feedback! :)");
        const item = {id: Math.random(), text: action.text, dateAdd: Date.now()}
        console.log(Date.now())
        return {
          entries: state.entries.concat(item)
        }
      }
  }
  return state
}

export default function Navigation() {
  const store = createStore(reducer)
  return (
    <Provider store={store}>
        <LiquidSwipe />
    </Provider>
  );
}
