# Redux Listeners

Redux middleware which allows listening in on and handling of dispatched actions

```
npm install --save redux-listeners
```

## Who needs this?

For those who want to listen in on actions dispatched to the Redux store.

Includes the store's dispatch method to dispatch new actions after a listener is fired.

Much like `redux-saga`, but a way more toned down implementation which also allows for `async/await`.

## Example

```js
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-listeners';

// import your reducers
import rootReducer from './reducers'; 

// create action middleware
const listenMiddleware = createMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(listenMiddleware),
);

// register listeners to middleware
listenMiddleware.addListener('INIT', (dispatch) => {
  dispatch({ type: 'FETCH_DATA' });
});

listenMiddleware.addListener('FETCH_DATA', (dispatch) => {
  fetch('/some-data')
    .then(response => response.text())
    .then(text => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: text }))
    .catch(err => dispatch({ type: 'FETCH_DATA_FAILED', payload: err }));
});

actionMiddleware.addListener('FETCH_DATA_FAILED', (dispatch, action) => {
  // display the error in console by reading the action
  console.error(action.payload.message);
});

store.dispatch({ type: 'INIT' });
  // This will fire the 'INIT' listener
  // Which in turn dispatches the 'FETCH_DATA' action
  // 'FETCH_DATA' listener is fired and asynchronously dispatches response actions
```

## Usage

### `createMiddleware()`
Creates the middleware you can pass into Redux.

*Returns* `middleware: Function`

### `middleware.addListener(actionType, listener)`
Binds `listener` function for each `actionType` dispatched to the redux store.

- `actionType: String | Array` The action type or an array of action types to match.
- `listener: Function(dispatch, action)` The function which will be called when an action of specified types is dispatched. Will receive `dispatch` and `action` as arguments to dispatch new actions and read the action being dispatched.

### `middleware.addListeners(actionType, ...listeners)`

- `actionType: String | Array` Same as `.addListener`.
- `...listeners: Array<Function(dispatch, action)>` Same as `.addListener`, but now a list of multiple listeners.

## License
MIT
