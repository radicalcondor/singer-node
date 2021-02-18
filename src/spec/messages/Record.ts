import * as yup from 'yup';

import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';
import { SingerSyncError } from '../errors';

const recordInputSchema = yup.object().shape({
  stream: yup.string().required(),
  time_extracted: yup.date().default(() => new Date()),
  record: yup.object().required(),
});

/**
 * `RECORD` messages contain the data from the data stream. A single Tap may
 * output `RECORD` messages with different stream names. A single `RECORD` entry
 * may only contain records for a single stream.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#record-message
 */
export interface RecordType<T extends JsonSchemaType = JsonSchemaType> {
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

export class Record<T extends JsonSchemaType = JsonSchemaType>
  implements MessageType, RecordType<T> {
  readonly type = MessageTypes.RECORD;
  stream: RecordType<T>['stream'];
  time_extracted?: RecordType<T>['time_extracted'];
  record: RecordType<T>['record'];

  constructor(options: RecordOptions<T>) {
    try {
      recordInputSchema.validateSync(options);
    } catch (e) {
      throw new SingerSyncError(e.message);
    }
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
