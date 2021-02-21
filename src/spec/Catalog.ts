import * as logger from './logger';
import { CatalogEntry, CatalogEntryType } from './CatalogEntry';
import { BookmarksStateType, getCurrentlySyncing } from './bookmarks';

const isCatalogEntryInstance = (
  possibleCatalog: CatalogEntryType,
): possibleCatalog is CatalogEntry => {
  return 'isSelected' in possibleCatalog;
};

/**
 * The output of discovery mode should be a list of the data streams a Tap
 * supports. This JSON formatted list is known as the catalog. The top level is
 * an object, with a single key called `streams` that points to an array of
 * objects.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/DISCOVERY_MODE.md#the-catalog
 */
export interface CatalogType {
  streams: CatalogEntryType[];
}

export class Catalog implements CatalogType {
  streams: CatalogEntry[] = [];

  constructor(streams: CatalogEntryType[]) {
    this.streams = streams.map(stream => {
      if (isCatalogEntryInstance(stream)) {
        return stream;
      }

      return new CatalogEntry(stream);
    });
  }

  getStream = (tap_stream_id: string) => {
    return this.streams.find(stream => {
      return (stream.tap_stream_id = tap_stream_id);
    });
  };

  shuffleStreams = (state: BookmarksStateType = {}) => {
    return getCurrentlySyncing(state) ? this.streams.reverse() : this.streams;
  };

  getSelectedStreams = (state?: BookmarksStateType): CatalogEntryType[] => {
    return this.shuffleStreams(state).filter(stream => {
      if (stream.isSelected()) {
        logger.info(`Skipping stream: ${stream.tap_stream_id}`);
        return true;
      }
      return false;
    });
  };

  toJSON = () => ({ streams: this.streams.map(stream => stream.toJSON()) });

  toString = () => JSON.stringify(this.toJSON());
}
