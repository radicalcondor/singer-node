import { MessageType } from './messages/Message';

export const warning = console.warn;

export const logMessage = (loggable: MessageType): void =>
  console.log(loggable.toString());

export const { log } = console;

export const { info } = console;
