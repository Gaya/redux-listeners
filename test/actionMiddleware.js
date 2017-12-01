import test from 'tape';

import { createMiddleware } from '../src/actionMiddleware';

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

  actionMiddleware.addListener();

  t.end();
});
