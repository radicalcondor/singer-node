import { JsonSchemaType } from '../types';
import { CatalogStreamType } from './CatalogStream';

/**
 * The output of discovery mode should be a list of the data streams a Tap
 * supports. This JSON formatted list is known as the catalog. The top level is
 * an object, with a single key called `streams` that points to an array of
 * objects.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/DISCOVERY_MODE.md#the-catalog
 */
export interface CatalogType<T extends JsonSchemaType = JsonSchemaType> {
  streams: CatalogStreamType<T>[];
}

export class Catalog<T extends JsonSchemaType = JsonSchemaType> implements CatalogType<T> {
  constructor(public streams: CatalogStreamType<T>[]) {}
}
