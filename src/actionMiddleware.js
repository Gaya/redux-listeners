function createListener(type, listener) {
  return {
    type,
    listener,
  };
}

export function createMiddleware() {
  const listeners = [];

  const middleware = (store) =>  {
    const dispatchImmediate = (...args) => {
      setTimeout(() => store.dispatch(...args), 0);
    };

    return (next) => (action) => {
      // execute registered listeners
      listeners
        .filter(({ type }) => {
          // first check if listener type is a string match
          if (type === action.type) {
            return true;
          }

          // then check if listener type is array and has action.type
          if (type.constructor === Array && type.indexOf(action.type) > -1) {
            return true;
          }

          return false;
        })
        .map(listener => listener.listener(dispatchImmediate, action));

      // continue middleware chain
      next(action);
    };
  };

  middleware.addListener = (type, listener) => {
    listeners.push(createListener(type, listener));
  };

  middleware.addListeners = (type, ...listeners) => {
    listeners.map(listener => middleware.addListener(type, listener));
  };

  return middleware;
}
