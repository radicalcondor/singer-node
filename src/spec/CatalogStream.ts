import { JsonSchemaType } from '../types';

export enum StreamReplicationMethods {
  FULL_TABLE = 'FULL_TABLE',
  INCREMENTAL = 'INCREMENTAL',
  LOG_BASED = 'LOG_BASED',
}

export enum StreamInclusionTypes {
  /**
   * `automatic` means that the Tap will emit values for the field.
   */
  AUTOMATIC = 'automatic',
  /**
   * `available` means the field is available for selection, and the Tap will
   * only emit values for that field if it is marked with `"selected": true`.
   */
  AVAILABLE = 'available',
  /**
   * `unsupported` means that the field exists in the source data but the Tap
   * is unable to provide it.
   */
  UNSUPPORTED = 'unsupported',
}

/**
 * Metadata is the preferred mechanism for associating extra information about
 * nodes in the schema.
 *
 * Certain metadata should be written and read by a Tap. This metadata is known
 * as discoverable metadata. Other metadata will be written by other systems
 * such as a UI and therefore should only be read by the Tap. This type of
 * metadata is called non-discoverable metadata.
 *
 * A Tap is free to write ANY type of metadata they feel is useful for
 * describing fields in the schema, although several reserved keywords exist. A
 * Tap that extracts data from a database should use additional metadata to
 * describe the properties of the database.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/DISCOVERY_MODE.md#metadata
 */
export interface CatalogStreamMetadataType {
  metadata: {
    /**
     * Indicates that this node in the schema has been selected by the user for
     * replication.
     *
     * @example true
     * @example false
     */
    readonly selected: boolean;

    /**
     * The replication method to use for a stream.
     *
     * @example FULL_TABLE
     * @example INCREMENTAL
     * @example LOG_BASED.
     */
    readonly 'replication-method': StreamReplicationMethods;

    /**
     * The name of a property in the source to use as a "bookmark". For example,
     * this will often be an "updated-at" field or an auto-incrementing primary
     * key (requires `replication-method`).
     */
    readonly 'replication-key': string;

    /**
     * List of key properties for a database view.
     */
    readonly 'view-key-properties': string;

    /**
     * A field's replication status.
     *
     * @example available
     * @example automatic
     * @example unsupported
     */
    inclusion: StreamInclusionTypes;

    /**
     * Indicates if a node in the schema should be replicated if a user has not
     * expressed any opinion on whether or not to replicate it.
     *
     * @example true
     * @example false
     */
    'selected-by-default': boolean;

    /**
     * List of fields that could be used as replication keys.
     */
    'valid-replication-keys': string[];

    /**
     * Used to force the replication method to either `FULL_TABLE` or
     * `INCREMENTAL`.
     *
     * @example FULL_TABLE
     * @example INCREMENTAL
     */
    'forced-replication-method':
      | StreamReplicationMethods.FULL_TABLE
      | StreamReplicationMethods.INCREMENTAL;

    /**
     * List of key properties for a database table.
     */
    'table-key-properties': string[];

    /**
     * The name of the stream.
     */
    'schema-name': string;

    /**
     * Indicates whether a stream corresponds to a database view.
     *
     * @example true
     * @example false
     */
    'is-view'?: boolean;

    /**
     * Number of rows in a database table/view.
     */
    'row-count'?: number;

    /**
     * The name of the database.
     */
    'database-name'?: string;

    /**
     * Represents the datatype of a database column.
     */
    'sql-datatype'?: string;
  };
  /**
   * The breadcrumb defines the path into the schema to the node to which the
   * metadata belongs. Metadata for a stream will have an empty breadcrumb.
   */
  breadcrumb: string[];
}

/**
 * @link https://github.com/singer-io/getting-started/blob/master/docs/DISCOVERY_MODE.md#the-catalog
 */
export interface CatalogStreamType<T extends JsonSchemaType> {
  /**
   * Name of the stream; must match the stream property of the any `SCHEMA`s
   * available to this Tap.
   */
  stream: string;
  /**
   * The time this record was observed in the source.
   */
  tap_stream_id: string;

  /**
   * The JSON schema for the stream.
   */
  schema: T;

  /**
   * For a database source, the name of the table.
   */
  table_name?: string;

  /**
   * @see CatalogStreamMetadataType
   */
  metadata?: CatalogStreamMetadataType[];
}

export class CatalogStream<T extends JsonSchemaType>
  implements CatalogStreamType<T> {
  metadata: CatalogStreamType<T>['metadata'];
  schema: CatalogStreamType<T>['schema'];
  stream: CatalogStreamType<T>['stream'];
  table_name?: CatalogStreamType<T>['table_name'];
  tap_stream_id: CatalogStreamType<T>['tap_stream_id'];

  constructor(options: CatalogStreamType<T>) {
    this.metadata = options.metadata;
    this.schema = options.schema;
    this.stream = options.stream;
    this.table_name = options.table_name;
    this.tap_stream_id = options.tap_stream_id;
  }
}
