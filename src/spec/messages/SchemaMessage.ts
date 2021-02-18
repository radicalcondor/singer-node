import * as yup from 'yup';

import { JsonSchemaType } from '../../types';
import { MessageType, MessageTypes } from './Message';
import { SingerSyncError } from '../errors';

const schema = yup.object().shape({
  bookmark_properties: yup.array().of(yup.string()),
  key_properties: yup.array().of(yup.string()),
  schema: yup.object().required(),
  stream: yup.string().required(),
});

/**
 * `SCHEMA` messages describe the types of data in the stream. A single tap may
 * output `SCHEMA` messages with different stream names. If a `RECORD` message
 * from a stream is not preceded by a `SCHEMA` message for that stream, it is
 * assumed to be schema-less.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#schema-message
 */
export interface SchemaMessageType<T extends JsonSchemaType = JsonSchemaType> {
  readonly type: MessageTypes.SCHEMA;

  /**
   * Name of the stream, must match the stream property of the RECORDS being described.
   */
  stream: string;

  /**
   * A list of strings indicating which properties make up
   * the primary key for this stream. Each item in the list must be the
   * name of a top-level property defined in the schema. A value for
   * key_properties must be provided, but it may be an empty list to
   * indicate that there is no primary key.
   * */
  key_properties: string[];

  /**
   * A list of strings indicating which properties the tap is using as bookmarks.
   * Each item in the list must be the name of a top-level property defined in the schema.
   */
  bookmark_properties?: string[];

  /**
   * A JSON Schema describing the data property of `RECORD` objects from the same stream.
   */
  schema: T;
}

type SchemaOptions<T> = Omit<SchemaMessageType<T>, 'type'>;

export class SchemaMessage<T extends JsonSchemaType = JsonSchemaType>
  implements MessageType, SchemaMessageType<T> {
  readonly type = MessageTypes.SCHEMA;
  stream: SchemaMessageType<T>['stream'];
  key_properties: SchemaMessageType<T>['key_properties'];
  bookmark_properties?: SchemaMessageType<T>['bookmark_properties'];
  schema: SchemaMessageType<T>['schema'];

  constructor(options: SchemaOptions<T>) {
    try {
      schema.validateSync(options);
    } catch (e) {
      throw new SingerSyncError(e.message);
    }
    this.stream = options.stream;
    this.key_properties = options.key_properties;
    this.bookmark_properties = options.bookmark_properties ?? [];
    this.schema = options.schema;
  }

  toString = () => {
    return JSON.stringify({
      type: this.type,
      stream: this.stream,
      key_properties: this.key_properties,
      bookmark_properties: this.bookmark_properties,
      schema: this.schema,
    });
  };
}
