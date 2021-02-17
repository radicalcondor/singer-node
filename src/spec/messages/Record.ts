import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';

/**
 * `RECORD` messages contain the data from the data stream. A single Tap may
 * output `RECORD` messages with different stream names. A single `RECORD` entry
 * may only contain records for a single stream.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#record-message
 */
export interface RecordType<T extends JsonSchemaType> {
  readonly type: MessageTypes.RECORD;

  /**
   * Name of the stream; must match the stream property of the `SCHEMA` property
   * that describes this `RECORD` type.
   */
  stream: string;
  /**
   * The time this record was observed in the source.
   */
  time_extracted?: Date;
  /**
   * A JSON map containing a streamed data point.
   */
  record: T;
}

type RecordOptions<T> = Omit<RecordType<T>, 'type'>;

export class Record<T> implements MessageType, RecordType<T> {
  readonly type = MessageTypes.RECORD;
  stream: RecordType<T>['stream'];
  time_extracted?: RecordType<T>['time_extracted'];
  record: RecordType<T>['record'];

  constructor(options: RecordOptions<T>) {
    this.stream = options.stream;
    this.time_extracted = options.time_extracted;
    this.record = options.record;
  }

  toString = () => {
    return JSON.stringify({
      type: this.type,
      stream: this.stream,
      time_extracted: this.time_extracted,
      record: this.record,
    });
  };
}
