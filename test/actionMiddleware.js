import test from 'tape';

import { createMiddleware } from '../src/actionMiddleware';

const mockStore = {
  dispatch() {

  },
};

test('Creating middleware', (t) => {
  const actionMiddleware = createMiddleware();

  t.equal(typeof actionMiddleware, 'function', 'Should return a function');
  t.equal(typeof actionMiddleware(), 'function', 'Should return a function returning a function');
  t.equal(typeof actionMiddleware.addListener, 'function', 'Should have addListener function');
  t.equal(typeof actionMiddleware.addListeners, 'function', 'Should have addListeners function');

  t.end();
});

test('Ability to register listeners', (t) => {
  const actionMiddleware = createMiddleware();

  let changeThis = '';
  let changeThat = '';

  actionMiddleware.addListener('TEST', () => { changeThis = 'Hello'; });
  actionMiddleware.addListener('TEST', () => { changeThat = 'Testing'; });

  const middleware = actionMiddleware(mockStore)(() => {});
  middleware({ type: 'TEST' });

  t.equal(changeThis, 'Hello', 'Run listener after a dispatch');
  t.equal(changeThat, 'Testing', 'Run second listener after a dispatch');

  t.end();
});

test('Ability to register multiple listeners at once', (t) => {
  const actionMiddleware = createMiddleware();

  let changeThis = '';
  let changeThat = '';

  actionMiddleware.addListeners(
    'TEST',
    () => { changeThis = 'Hello'; },
    () => { changeThat = 'Testing'; },
  );

  const middleware = actionMiddleware(mockStore)(() => {});
  middleware({ type: 'TEST' });

  t.equal(changeThis, 'Hello', 'Run listener after a dispatch');
  t.equal(changeThat, 'Testing', 'Run second listener after a dispatch');

  t.end();
});

test('Ability to register multiple action types', (t) => {
  const actionMiddleware = createMiddleware();

  let increment = 0;

  actionMiddleware.addListener(['TEST', 'ANOTHER'], () => { increment++ });

  const middleware = actionMiddleware(mockStore)(() => {});

  middleware({ type: 'TEST' });
  t.equal(increment, 1, 'Listen to first action type');

  middleware({ type: 'ANOTHER' });
  t.equal(increment, 2, 'Listen to second action type');

  t.end();
});
