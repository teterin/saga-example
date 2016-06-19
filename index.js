import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import { take } from 'redux-saga/effects'
import App from './components/app';
import Bar from './components/bar';
import Foo from './components/foo';

function* rootSaga() {
    const action = yield take('@@router/LOCATION_CHANGE')
    // Here we realize which page user requested and fetch data for that
    console.log(action);
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    combineReducers({routing: routerReducer}),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Foo}/>
            <Route path="foo" component={Foo}/>
            <Route path="bar" component={Bar}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);