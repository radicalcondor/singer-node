import { MessageType, MessageTypes } from './Message';
import { RecordMessage, RecordMessageType } from './RecordMessage';
import { SchemaMessage, SchemaMessageType } from './SchemaMessage';
import { SingerError } from '../errors';
import { StateMessage, StateMessageType } from './StateMessage';

const isMessage = (message: object): message is MessageType => {
  return 'type' in message;
};

const isRecord = (message: MessageType): message is RecordMessageType => {
  return (message as RecordMessageType).type === MessageTypes.RECORD;
};

const isSchema = (message: MessageType): message is SchemaMessageType => {
  return (message as SchemaMessageType).type === MessageTypes.SCHEMA;
};

const isState = (message: MessageType): message is StateMessageType => {
  return (message as StateMessageType).type === MessageTypes.STATE;
};

type ParserFn<T extends MessageType> = (message: MessageType) => T | false;
type AllMessageTypes = RecordMessageType | SchemaMessageType;
type MessageParsers = Record<MessageTypes, ParserFn<AllMessageTypes>>;

const MESSAGE_PARSERS: MessageParsers = {
  [MessageTypes.RECORD]: (message: any) =>
    isRecord(message) && new RecordMessage(message),
  [MessageTypes.SCHEMA]: (message): any =>
    isSchema(message) && new SchemaMessage(message),
  [MessageTypes.STATE]: (message): any =>
    isState(message) && new StateMessage(message.value),
};

export const parseMessage = (messageString: string) => {
  let message;
  try {
    message = JSON.parse(messageString);
  } catch (e) {
    throw new SingerError(e.message);
  }

  if (!isMessage(message)) {
    throw new SingerError(
      'The provided JSON does not seem to be a valid Singer message',
    );
  }

  const parser = MESSAGE_PARSERS[message.type as MessageTypes];

  if (!parser) {
    throw new SingerError('Invalid message type');
  }

  return parser(message);
};
