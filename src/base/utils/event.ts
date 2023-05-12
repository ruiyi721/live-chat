import { EventEmitter } from 'eventemitter3';
import { TypedEmitter } from 'tiny-typed-emitter';

export enum AppEvents {
  Modal = 'Modal',
}

interface AppEventSignatures {
  [AppEvents.Modal]: (message: string) => void;
}

export const appEmitter = new EventEmitter() as TypedEmitter<AppEventSignatures>;