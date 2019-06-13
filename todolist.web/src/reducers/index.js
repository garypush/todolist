import { combineReducers } from 'redux'
import {
  MAKE_REQUEST,
  RECEIVE_ITEMS,
  RECEIVE_ITEM_DELETE,
  RECEIVE_ITEM_ADD,
  RECEIVE_ITEM_UPDATE
} from '../actions/index'

const defaultState = {
  items: [],
  isFetching: false,
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case MAKE_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }
    case RECEIVE_ITEMS: {
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    }
    case RECEIVE_ITEM_UPDATE: {
      let newItems = [...state.items]
      let i = newItems.findIndex(item => item.id === action.item.id)
      newItems[i] = action.item
      return Object.assign({}, state, {
        isFetching: false,
        items: newItems
      })
    }
    case RECEIVE_ITEM_ADD: {
      let newItems = [...state.items]
      newItems.push(action.item)
      return Object.assign({}, state, {
        isFetching: false,
        items: newItems
      })
    }
    case RECEIVE_ITEM_DELETE: {
      let newItems = [...state.items]
      let i = newItems.findIndex(item => item.id === action.id)
      newItems.splice(i, 1)
      return Object.assign({}, state, {
        isFetching: false,
        items: newItems
      })
    }
    default: {
      return state
    }
  }
}

const rootReducer = combineReducers({
  reducer
})

export default rootReducer