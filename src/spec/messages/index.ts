import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';
import { RecordMessage as RecordMessage, RecordMessageType } from './RecordMessage';

const isRecord = (message: MessageType): message is RecordMessageType => {
  return (message as RecordMessageType).type === MessageTypes.RECORD;
};

const foo: Partial<Record<
  MessageTypes,
  (m: any) => false | RecordMessage<JsonSchemaType>
>> = {
  [MessageTypes.RECORD]: (message: any) =>
    isRecord(message) && new RecordMessage(message),
};

export const parseMessage = (messageString: string) => {
  const message = JSON.parse(messageString);

  const parser = foo[message.type as MessageTypes];

  if (!parser) {
    throw new Error('Invalid message type');
  }

  return parser(message) as RecordMessage<JsonSchemaType>;
};
