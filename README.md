# Redux Action Middleware

Redux middleware which allows the user to acts upon fired action types to the store.

```
npm install --save redux-action-middleware
```

## Who needs this?

For those who want to listen to actions dispatched on the Redux store and act upon them.

Includes the store's dispatch to execute actions when a listener is fired.

## Usage

```
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-action-middleware';

// import your reducers
import rootReducer from './reducers'; 

// create action middleware
const actionMiddleware = createMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(actionMiddleware),
);

// register listeners to middleware
actionMiddleware.addListener('INIT', (dispatch) => {
  dispatch({ type: 'FETCH_DATA' });
});

actionMiddleware.addListener('FETCH_DATA', (dispatch) => {
  fetch('/some-data')
    .then(response => response.text())
    .then(text => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: text }))
    .catch(err => dispatch({ type: 'FETCH_DATA_FAILED', payload: err }));
});

store.dispatch({ type: 'INIT' });
  // This will fire the 'INIT' listener
  // Which in turn dispatched the 'FETCH_DATA' action
  // 'FETCH_DATA' listener is fired and synchronously dispatches response actions
```

## License
MIT
