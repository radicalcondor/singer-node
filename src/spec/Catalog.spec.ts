import * as logger from './logger';

import {
  CatalogEntry,
  CatalogEntryMetadataType,
  CatalogEntryType,
} from './CatalogEntry';
import { Catalog } from './Catalog';
import { JsonSchemaType } from '../types';

jest.mock('./logger');

const createStreamEntry = (
  streamId: string,
  metadata: CatalogEntryMetadataType[] = [],
  schema: JsonSchemaType = {},
): CatalogEntryType => {
  return {
    stream: 's',
    tap_stream_id: streamId,
    schema,
    metadata,
  };
};

describe('Catalog', () => {
  describe('#getSelectedStreams', () => {
    it('should get a single selected stream', () => {
      const selectedEntry = new CatalogEntry(
        createStreamEntry('a', [
          {
            metadata: {
              selected: true,
            },
            breadcrumb: [],
          },
        ]),
      );

      const catalog = new Catalog([
        selectedEntry,
        createStreamEntry('b'),
        new CatalogEntry(createStreamEntry('c')),
      ]);

      const actual = catalog.getSelectedStreams();
      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(actual).toEqual([selectedEntry]);
    });

    it('should resume a currently syncing stream', () => {
      const selectedEntryA = new CatalogEntry(
        createStreamEntry('a', [
          {
            metadata: {
              selected: true,
            },
            breadcrumb: [],
          },
        ]),
      );

      const selectedEntryC = new CatalogEntry(
        createStreamEntry('c', [
          {
            metadata: {
              selected: true,
            },
            breadcrumb: [],
          },
        ]),
      );

      const catalog = new Catalog([
        selectedEntryA,
        new CatalogEntry(createStreamEntry('b')),
        selectedEntryC,
      ]);
      const state = { currently_syncing: 'c' };

      const [first] = catalog.getSelectedStreams(state);
      expect(first).toEqual(selectedEntryC);
    });
  });

  describe('#getStream', () => {
    it('should get a stream', () => {
      const catalog = new Catalog([
        new CatalogEntry(createStreamEntry('a')),
        new CatalogEntry(createStreamEntry('b')),
        new CatalogEntry(createStreamEntry('c')),
      ]);
      const entry = catalog.getStream('b');
      expect(entry?.tap_stream_id).toEqual('b');
    });
  });

  describe('Serialization', () => {
    const RAW_CATALOG = {
      streams: [
        {
          database_name: 'prod',
          metadata: [
            {
              metadata: {
                'metadata-key': 'metadata-value',
              },
              breadcrumb: ['properties', 'name'],
            },
          ],
          schema: {
            type: 'object',
            selected: true,
            properties: {
              id: { type: 'integer', selected: true },
              name: { type: 'string', selected: true },
            },
          },
          stream: 'users',
          stream_alias: 'users_alias',
          table_name: 'users',
          tap_stream_id: 'prod_users',
        },
        {
          database_name: 'prod',
          schema: {
            type: 'object',
            selected: true,
            properties: {
              id: { type: 'integer', selected: true },
              amount: { type: 'number', selected: true },
            },
          },
          stream: 'orders',
          table_name: 'orders',
          tap_stream_id: 'prod_orders',
        },
      ],
    };
    const catalog = new Catalog([
      new CatalogEntry({
        database_name: 'prod',
        metadata: [
          {
            metadata: {
              'metadata-key': 'metadata-value',
            },
            breadcrumb: ['properties', 'name'],
          },
        ],
        schema: {
          type: 'object',
          selected: true,
          properties: {
            id: { type: 'integer', selected: true },
            name: { type: 'string', selected: true },
          },
        },
        stream: 'users',
        stream_alias: 'users_alias',
        table_name: 'users',
        tap_stream_id: 'prod_users',
      }),
      new CatalogEntry({
        database_name: 'prod',
        schema: {
          type: 'object',
          selected: true,
          properties: {
            id: { type: 'integer', selected: true },
            amount: { type: 'number', selected: true },
          },
        },
        stream: 'orders',
        table_name: 'orders',
        tap_stream_id: 'prod_orders',
      }),
    ]);

    it('should serialize all fields to JSON correctly', () => {
      expect(catalog.toJSON()).toEqual(RAW_CATALOG);
    });

    it('should serialize all fields to a string correctly', () => {
      expect(`${catalog}`).toEqual(JSON.stringify(RAW_CATALOG));
    });
  });
});
