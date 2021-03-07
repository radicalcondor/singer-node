import { JsonSchemaType, PrimitiveTypes } from '../types';

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
export interface CatalogEntryMetadataType {
  metadata: {
    [key: string]: PrimitiveTypes | PrimitiveTypes[];

    /**
     * Indicates that this node in the schema has been selected by the user for
     * replication.
     *
     * @example true
     * @example false
     */
    readonly selected?: boolean;

    /**
     * The replication method to use for a stream.
     *
     * @example FULL_TABLE
     * @example INCREMENTAL
     * @example LOG_BASED.
     */
    readonly 'replication-method'?: StreamReplicationMethods;

    /**
     * The name of a property in the source to use as a "bookmark". For example,
     * this will often be an "updated-at" field or an auto-incrementing primary
     * key (requires `replication-method`).
     */
    readonly 'replication-key'?: string;

    /**
     * List of key properties for a database view.
     */
    readonly 'view-key-properties'?: string;

    /**
     * A field's replication status.
     *
     * @example available
     * @example automatic
     * @example unsupported
     */
    inclusion?: StreamInclusionTypes;

    /**
     * Indicates if a node in the schema should be replicated if a user has not
     * expressed any opinion on whether or not to replicate it.
     *
     * @example true
     * @example false
     */
    'selected-by-default'?: boolean;

    /**
     * List of fields that could be used as replication keys.
     */
    'valid-replication-keys'?: string[];

    /**
     * Used to force the replication method to either `FULL_TABLE` or
     * `INCREMENTAL`.
     *
     * @example FULL_TABLE
     * @example INCREMENTAL
     */
    'forced-replication-method'?:
      | StreamReplicationMethods.FULL_TABLE
      | StreamReplicationMethods.INCREMENTAL;

    /**
     * List of key properties for a database table.
     */
    'table-key-properties'?: string[];

    /**
     * The name of the stream.
     */
    'schema-name'?: string;

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

/* eslint-disable camelcase */
/**
 * @link https://github.com/singer-io/getting-started/blob/master/docs/DISCOVERY_MODE.md#the-catalog
 */
export interface CatalogEntryType<T extends JsonSchemaType = JsonSchemaType> {
  /**
   * For a database source, the name of the database.
   */
  database_name?: string;

  /**
   * Indicates whether a stream corresponds to a database view.
   *
   * @example true
   * @example false
   */
  is_view?: boolean;

  key_properties?: string[];

  /**
   * @see CatalogEntryMetadataType
   */
  metadata?: CatalogEntryMetadataType[];

  /**
   * The name of a property in the source to use as a "bookmark". For example,
   * this will often be an "updated-at" field or an auto-incrementing primary
   * key (requires `replication-method`).
   */
  replication_key?: string;

  /**
   * The replication method to use for a stream.
   *
   * @example FULL_TABLE
   * @example INCREMENTAL
   * @example LOG_BASED.
   */
  replication_method?: StreamReplicationMethods;

  /**
   * Number of rows in a database table/view.
   */
  row_count?: number;

  /**
   * The JSON schema for the stream.
   */
  schema: T;

  /**
   * Name of the stream; must match the stream property of the any `SCHEMA`s
   * available to this Tap.
   */
  stream: string;

  /**
   * An aliased name of the stream.
   */
  stream_alias?: string;

  /**
   * For a database source, the name of the table.
   */
  table_name?: string;

  /**
   * The time this record was observed in the source.
   */
  tap_stream_id: string;
}

/* eslint-enable camelcase */

type CompiledMetadata = Record<string, CatalogEntryMetadataType['metadata']>;

export class CatalogEntry<T extends JsonSchemaType = JsonSchemaType>
  implements CatalogEntryType<T> {
  /* eslint-disable camelcase */

  compiledMetadata: CompiledMetadata;

  database_name?: CatalogEntryType<T>['database_name'];

  is_view: CatalogEntryType<T>['is_view'];

  key_properties: CatalogEntryType<T>['key_properties'];

  metadata: CatalogEntryType<T>['metadata'];

  replication_key: CatalogEntryType<T>['replication_key'];

  replication_method: CatalogEntryType<T>['replication_method'];

  row_count: CatalogEntryType<T>['row_count'];

  schema: CatalogEntryType<T>['schema'];

  stream: CatalogEntryType<T>['stream'];

  stream_alias: CatalogEntryType<T>['stream_alias'];

  table_name?: CatalogEntryType<T>['table_name'];

  tap_stream_id: CatalogEntryType<T>['tap_stream_id'];

  constructor(options: CatalogEntryType<T>) {
    this.tap_stream_id = options.tap_stream_id;
    this.stream = options.stream;
    this.key_properties = options.key_properties;
    this.schema = options.schema;
    this.replication_key = options.replication_key;
    this.is_view = options.is_view;
    this.database_name = options.database_name;
    this.table_name = options.table_name;
    this.row_count = options.row_count;
    this.stream_alias = options.stream_alias;
    this.metadata = options.metadata;
    this.compiledMetadata = this.convertMetadataToMap(options.metadata);
    this.replication_method = options.replication_method;
  }

  /* eslint-enable camelcase */

  convertMetadataToMap = (
    metadata: CatalogEntryMetadataType[] = [],
  ): CompiledMetadata => {
    return metadata.reduce((result, value) => {
      const key = value.breadcrumb.join('');
      return {
        ...result,
        [key]: value.metadata,
      };
    }, {} as CompiledMetadata);
  };

  isSelected = (): boolean => {
    return this.compiledMetadata['']?.selected ?? false;
  };

  /* eslint-disable camelcase */
  toJSON = (): CatalogEntryType<T> => ({
    database_name: this.database_name,
    is_view: this.is_view,
    key_properties: this.key_properties,
    metadata: this.metadata,
    replication_key: this.replication_key,
    replication_method: this.replication_method,
    row_count: this.row_count,
    schema: this.schema,
    stream: this.stream,
    stream_alias: this.stream_alias,
    table_name: this.table_name,
    tap_stream_id: this.tap_stream_id,
  });
  /* eslint-enable camelcase */

  toString = (): string => JSON.stringify(this.toJSON());
}
