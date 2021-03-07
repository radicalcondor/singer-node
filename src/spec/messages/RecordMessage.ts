import * as yup from 'yup';

import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';
import { SingerSyncError } from '../errors';

const schema = yup.object().shape({
  record: yup.object().required(),
  stream: yup.string().required(),
  time_extracted: yup.date().optional(),
  version: yup.number().optional(),
});

/**
 * `RECORD` messages contain the data from the data stream. A single Tap may
 * output `RECORD` messages with different stream names. A single `RECORD` entry
 * may only contain records for a single stream.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#record-message
 */
export interface RecordMessageType<T extends JsonSchemaType = JsonSchemaType>
  extends MessageType {
  readonly type: MessageTypes.RECORD;

  /**
   * Name of the stream; must match the stream property of the `SCHEMA` property
   * that describes this `RECORD` type.
   */
  stream: string;

  /* eslint-disable camelcase */

  /**
   * The time this record was observed in the source.
   */
  time_extracted?: Date;
  /**
   * A JSON map containing a streamed data point.
   */

  /* eslint-enable camelcase */

  record: T;

  version?: number;
}

type RecordOptions<T> = Omit<RecordMessageType<T>, 'type'>;

export class RecordMessage<T extends JsonSchemaType = JsonSchemaType>
  implements RecordMessageType<T> {
  readonly type = MessageTypes.RECORD;

  stream: RecordMessageType<T>['stream'];

  /* eslint-disable camelcase */

  time_extracted?: RecordMessageType<T>['time_extracted'];

  record: RecordMessageType<T>['record'];

  version: RecordMessageType<T>['version'];

  constructor(options: RecordOptions<T>) {
    try {
      schema.validateSync(options);
    } catch (e) {
      throw new SingerSyncError(e.message);
    }
    this.stream = options.stream;
    this.time_extracted = options.time_extracted;
    this.record = options.record;
    this.version = options.version;
  }

  /* eslint-enable camelcase */

  toString = (): string => {
    return JSON.stringify({
      record: this.record,
      stream: this.stream,
      time_extracted: this.time_extracted,
      type: this.type,
    });
  };
}
