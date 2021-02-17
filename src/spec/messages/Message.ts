export enum MessageTypes {
  RECORD = 'RECORD',
  SCHEMA = 'SCHEMA',
  STATE = 'STATE',
}

export interface MessageType {
  readonly type: MessageTypes;
  toString(): string;
}
