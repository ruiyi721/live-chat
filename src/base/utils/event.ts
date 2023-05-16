import { EventEmitter } from 'eventemitter3';
import { TypedEmitter } from 'tiny-typed-emitter';

export enum AppEvents {
  Modal = 'Modal',
  Logout = 'Logout',
}

interface AppEventSignatures {
  [AppEvents.Modal]: (message: string) => void;
  [AppEvents.Logout]: () => void;
}

export const appEmitter = new EventEmitter() as TypedEmitter<AppEventSignatures>;