import test from 'tape';

import { createMiddleware } from '../src/listenerMiddleware';

const mockStore = {
  dispatch() {},
};

test('Creating middleware', (t) => {
  const listenMiddleware = createMiddleware();

  t.equal(typeof listenMiddleware, 'function', 'Should return a function');
  t.equal(typeof listenMiddleware(), 'function', 'Should return a function returning a function');
  t.equal(typeof listenMiddleware.addListener, 'function', 'Should have addListener function');
  t.equal(typeof listenMiddleware.addListeners, 'function', 'Should have addListeners function');

  t.end();
});

test('Ability to register listeners', (t) => {
  const listenMiddleware = createMiddleware();

  let changeThis = '';
  let changeThat = '';

  listenMiddleware.addListener('TEST', () => { changeThis = 'Hello'; });
  listenMiddleware.addListener('TEST', () => { changeThat = 'Testing'; });

  const middleware = listenMiddleware(mockStore)(() => {});
  middleware({ type: 'TEST' });

  t.equal(changeThis, 'Hello', 'Run listener after a dispatch');
  t.equal(changeThat, 'Testing', 'Run second listener after a dispatch');

  t.end();
});

test('Ability to register multiple listeners at once', (t) => {
  const listenMiddleware = createMiddleware();

  let changeThis = '';
  let changeThat = '';

  listenMiddleware.addListeners(
    'TEST',
    () => { changeThis = 'Hello'; },
    () => { changeThat = 'Testing'; },
  );

  const middleware = listenMiddleware(mockStore)(() => {});
  middleware({ type: 'TEST' });

  t.equal(changeThis, 'Hello', 'Run listener after a dispatch');
  t.equal(changeThat, 'Testing', 'Run second listener after a dispatch');

  t.end();
});

test('Ability to register multiple action types', (t) => {
  const listenMiddleware = createMiddleware();

  let increment = 0;

  listenMiddleware.addListener(['TEST', 'ANOTHER'], () => { increment++ });

  const middleware = listenMiddleware(mockStore)(() => {});

  middleware({ type: 'TEST' });
  t.equal(increment, 1, 'Listen to first action type');

  middleware({ type: 'ANOTHER' });
  t.equal(increment, 2, 'Listen to second action type');

  t.end();
});

test('Actions will be dispatched afterwards', (t) => {
  t.plan(4);

  const listenMiddleware = createMiddleware();

  let increment = 0;

  listenMiddleware.addListener('TEST', (dispatch) => {
    t.equal(increment, 0, 'First fire listener');

    increment++;

    dispatch({ type: 'ANOTHER' });
  });

  const dispatchableStore = {
    dispatch(action) {
      t.equal(increment, 2, 'After all dispatch to store');
      t.equal(action.type, 'ANOTHER', 'After all dispatch to store with the correct type');
    },
  };

  const middleware = listenMiddleware(dispatchableStore)(() => {
    t.equal(increment, 1, 'Call next middleware after listeners');

    increment++;
  });

  middleware({ type: 'TEST' });
});
