import { MessageType, MessageTypes } from './Message';
import { RecordMessage, RecordMessageType } from './RecordMessage';
import {SchemaMessage, SchemaMessageType} from "./SchemaMessage";
import {SingerError} from "../errors";

const isMessage = (message: object): message is MessageType => {
  if ('type' in message) {
    return true;
  };
  return false;
};

const isRecord = (message: MessageType): message is RecordMessageType => {
  return (message as RecordMessageType).type === MessageTypes.RECORD;
};

const isSchema = (message: MessageType): message is SchemaMessageType => {
  return (message as SchemaMessageType).type === MessageTypes.SCHEMA;
};

type ParserFn<T extends MessageType> = (message: MessageType) => T | false;
type AllMessageTypes = RecordMessageType | SchemaMessageType;
type MessageParsers = Record<MessageTypes, ParserFn<AllMessageTypes>>

// @TODO Remove `Partial<>` after implementing MessageTypes.STATE
const MESSAGE_PARSERS: Partial<MessageParsers> = {
  [MessageTypes.RECORD]: (message: any) =>
    isRecord(message) && new RecordMessage(message),
  [MessageTypes.SCHEMA]: (message): any =>
    isSchema(message) && new SchemaMessage(message),
};

export const parseMessage = (messageString: string) => {

  let message
  try {
    message = JSON.parse(messageString);
  } catch (e) {
    throw new SingerError(e.message);
  }

  if (!isMessage(message)) {
    throw new SingerError('The provided JSON does not seem to be a valid Singer message');
  }

  const parser = MESSAGE_PARSERS[message.type as MessageTypes];

  if (!parser) {
    throw new Error('Invalid message type');
  }

  return parser(message);
};
