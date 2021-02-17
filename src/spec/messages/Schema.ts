import { JsonSchemaType, StreamTypes } from '../../types';

/**
 * `SCHEMA` messages describe the types of data in the stream. A single tap may
 * output `SCHEMA` messages with different stream names. If a `RECORD` message
 * from a stream is not preceded by a `SCHEMA` message for that stream, it is
 * assumed to be schema-less.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#schema-message
 */
export interface SchemaType<T extends JsonSchemaType> {
  readonly type: StreamTypes.SCHEMA;

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

type SchemaOptions<T> = Omit<SchemaType<T>, 'type'>;

export class Schema<T> implements SchemaType<T> {
  readonly type = StreamTypes.SCHEMA;
  stream: SchemaType<T>['stream'];
  key_properties: SchemaType<T>['key_properties'];
  bookmark_properties?: SchemaType<T>['bookmark_properties'];
  schema: SchemaType<T>['schema'];

  constructor(options: SchemaOptions<T>) {
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
