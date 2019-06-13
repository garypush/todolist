import axios from 'axios';

export const MAKE_REQUEST = 'MAKE_REQUEST'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const RECEIVE_ITEM_ADD = 'RECEIVE_ITEM_ADD'
export const RECEIVE_ITEM_DELETE = 'RECEIVE_ITEM_DELETE'
export const RECEIVE_ITEM_UPDATE = 'RECEIVE_ITEM_UPDATE'

axios.defaults.baseURL = 'http://localhost:8000/'

export function addItem(description) {
  return async dispatch => {
    dispatch(makeRequest())
    const response = await axios.post(`/items/`, {
      description: description
    });
    return dispatch(receiveItemAdd(response.data));
  }
}

export function updateItem(id, item) {
  return async dispatch => {
    dispatch(makeRequest())
    const response = await axios.put(`/items/${id}/`, {
      description: item.description,
      status: item.status
    });
    return dispatch(receiveItemUpdate(response.data));
  }
}

export function deleteItem(id) {
  return async dispatch => {
    dispatch(makeRequest())
    await axios.delete(`/items/${id}/`);
    return dispatch(receiveItemDelete(id));
  }
}

export function fetchItems() {
  return async dispatch => {
    dispatch(makeRequest())
    const response = await axios.get(`/items`);
    return dispatch(receiveItems(response.data));
  }
}

function makeRequest() {
  return {
    type: MAKE_REQUEST,
  }
}

function receiveItems(json) {
  return {
    type: RECEIVE_ITEMS,
    items: json
  }
}

function receiveItemAdd(json) {
  return {
    type: RECEIVE_ITEM_ADD,
    item: json
  }
}

function receiveItemUpdate(json) {
  return {
    type: RECEIVE_ITEM_UPDATE,
    item: json
  }
}

function receiveItemDelete(id) {
  return {
    type: RECEIVE_ITEM_DELETE,
    id: id
  }
}