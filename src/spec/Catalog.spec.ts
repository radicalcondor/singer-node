import * as logger from './logger';

import { CatalogEntry, CatalogEntryMetadataType } from './CatalogEntry';
import { Catalog } from './Catalog';
import { JsonSchemaType } from '../types';

jest.mock('./logger');

const createStreamEntry = (
  streamId: string,
  metadata: CatalogEntryMetadataType[] = [],
  schema: JsonSchemaType = {},
) => {
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
});
