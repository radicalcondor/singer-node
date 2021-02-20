import * as bookmarks from './bookmarks';
import { BookmarksStateType } from './bookmarks';

describe('bookmarks', () => {
  describe(`#${bookmarks.getBookmark.name}`, () => {
    it('should provide defaults when no state is provided', () => {
      const state: BookmarksStateType = {};

      // Case with no value to fall back on
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key'),
      ).toBeUndefined();

      // Case with a given default
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key', 'default_value'),
      ).toBe('default_value');
    });

    it('should provide defaults when no bookmarks exist', () => {
      const state: BookmarksStateType = {
        bookmarks: {},
      };

      // Case with no value to fall back on
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key'),
      ).toBeUndefined();

      // Case with a given default
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key', 'default_value'),
      ).toEqual('default_value');
    });

    it('should retrieve values when state is provided', () => {
      const streamId = 'customers';
      const bookmarkKey = 'datetime';
      const bookmarkValue = 123456789;

      const state: BookmarksStateType = {
        bookmarks: {
          [streamId]: {
            [bookmarkKey]: bookmarkValue,
          },
        },
      };

      /*
        Cases with no value to fall back on
      */
      // Bad stream, bad key
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key'),
      ).toBeUndefined();

      // Good stream, bad key
      expect(bookmarks.getBookmark(state, streamId, 'my_key')).toBeUndefined();

      // # Good stream, good key
      expect(bookmarks.getBookmark(state, streamId, bookmarkKey)).toEqual(
        bookmarkValue,
      );

      /*
        Cases with a given default
      */

      // # Bad stream, bad key
      expect(
        bookmarks.getBookmark(state, 'some_stream', 'my_key', 'default_value'),
      ).toEqual('default_value');

      // # Bad stream, good key
      expect(
        bookmarks.getBookmark(
          state,
          'some_stream',
          bookmarkKey,
          'default_value',
        ),
      ).toEqual('default_value');

      // # Good stream, bad key
      expect(
        bookmarks.getBookmark(state, streamId, 'my_key', 'default_value'),
      ).toEqual('default_value');

      // # Good stream, good key
      expect(
        bookmarks.getBookmark(state, streamId, bookmarkKey, 'default_value'),
      ).toEqual(bookmarkValue);
    });
  });

  describe(`#${bookmarks.getOffset.name}`, () => {
    it('should provide defaults when no state is provided', () => {});
    it('should provide defaults when no bookmarks exist', () => {});
    it('should retrieve values when state is provided', () => {
      const streamId = 'customers';
      const bookmarkKey = 'datetime';
      const bookmarkValue = 123456789;
      const offsetValue = 'fizzy water';

      const state: BookmarksStateType = {
        bookmarks: {
          [streamId]: {
            [bookmarkKey]: bookmarkValue,
            offset: offsetValue,
          },
        },
      };

      /**
       * Cases with no value to fall back on
       */

      // Bad stream
      expect(bookmarks.getOffset(state, 'some_stream'));

      // Good stream
      expect(bookmarks.getOffset(state, streamId)).toEqual(offsetValue);

      /**
       * Case with a given default
       */

      // Bad stream
      expect(
        bookmarks.getOffset(state, 'some_stream', 'default_value'),
      ).toEqual('default_value');

      // Good stream
      expect(bookmarks.getOffset(state, streamId, 'default_value')).toEqual(
        offsetValue,
      );
    });
  });

  describe(`#${bookmarks.getCurrentlySyncing.name}`, () => {
    it('should provide defaults when no state is provided', () => {});
    it('should retrieve values when state is provided', () => {});
  });
});
