import { MessageType } from './messages/Message';

export const warning = console.warn;

export const logMessage = (loggable: MessageType) =>
  console.log(loggable.toString());

export const log = console.log;

export const info = console.info;
