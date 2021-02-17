/**
 * Possible types of a message
 */
export enum MessageTypes {
  RECORD = 'RECORD',
  SCHEMA = 'SCHEMA',
  STATE = 'STATE',
}

export interface MessageType {
  /**
   * The type of the message.
   *
   * @example MessageTypes.RECORD
   */
  readonly type: MessageTypes;

  /**
   * Convert a message to a JSON string.
   */
  toString(): string;
}
