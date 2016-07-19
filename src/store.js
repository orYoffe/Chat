import React from 'react'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import indexReduxer from './reducers/index'

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    app: indexReduxer,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  return store
}
