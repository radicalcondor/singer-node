import { CatalogEntry, CatalogEntryMetadataType } from './CatalogEntry';
import { Catalog } from './Catalog';

const createStreamEntry = (
  streamId: string,
  metadata: CatalogEntryMetadataType[] = [],
) => {
  return {
    stream: 's',
    tap_stream_id: streamId,
    schema: {},
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

      expect(actual).toEqual([selectedEntry]);
    });

    it.skip('should resume a currently syncing stream', () => {});
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
