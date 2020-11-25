import { AnyAction, Dispatch, Middleware } from "redux";

export type ReduxListener = (dispatch: Dispatch, action: AnyAction) => void;

interface ReduxListenerMiddleware extends Middleware {
  addListener(actionType: string | string[], listener: ReduxListener): void;
  addListeners(actionType: string | string[], listeners: ReduxListener[]): void;
}

export function createMiddleware(): ReduxListenerMiddleware;
