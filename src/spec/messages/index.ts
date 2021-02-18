import { MessageType, MessageTypes } from './Message';
import { Record, RecordType } from './Record';

const isRecord = (message: MessageType): message is RecordType => {
  return (message as RecordType).type === MessageTypes.RECORD;
};

export const parseMessage = (messageString: string) => {
  const message = JSON.parse(messageString);

  switch (message.type) {
    case MessageTypes.RECORD:
      if (isRecord(message)) {
        return new Record(message);
      }
  }

  throw new Error('Invalid message type');
};
