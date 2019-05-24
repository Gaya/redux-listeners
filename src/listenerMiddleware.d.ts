declare module 'redux-listeners' {
  import { Action, Dispatch, Middleware } from 'redux';

  type listener = (dispatch: Dispatch, action: Action) => void;

  interface ReduxListenerMiddleware extends Middleware {
    addListener(actionType: string | string[], listener: listener): void;
    addListeners(actionType: string | string[], listeners: listener[]): void;
  }

  export function createMiddleware(): ReduxListenerMiddleware;
}
