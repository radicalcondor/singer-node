import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';
import { Record as RecordMessage, RecordType } from './Record';

const isRecord = (message: MessageType): message is RecordType => {
  return (message as RecordType).type === MessageTypes.RECORD;
};

const foo: Partial<Record<MessageTypes, (m: any) => false | RecordMessage<JsonSchemaType>>> = {
  [MessageTypes.RECORD]: (message: any) => isRecord(message) && new RecordMessage(message),
}

export const parseMessage = (messageString: string) => {
  const message = JSON.parse(messageString);

  const parser = foo[message.type as MessageTypes];

  if (!parser) {
    throw new Error('Invalid message type');
  }

  return parser(message) as RecordMessage<JsonSchemaType>;
};
