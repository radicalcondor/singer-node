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
    it.skip('should provide defaults when no state is provided', () => {
      const state: BookmarksStateType = {};

      // Case with no value to fall back on
      expect(bookmarks.getOffset(state, 'some_stream')).toBeUndefined();

      // Case with a given default
      expect(bookmarks.getOffset(state, 'some_stream', 'default_value')).toBe(
        'default_value',
      );
    });
    it.skip('should provide defaults when no bookmarks exist', () => {
      const state: BookmarksStateType = {
        bookmarks: {},
      };

      // Case with no value to fall back on
      expect(bookmarks.getOffset(state, 'some_stream')).toBeUndefined();

      // Case with a given default
      expect(
        bookmarks.getOffset(state, 'some_stream', 'default_value'),
      ).toEqual('default_value');
    });

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
    it('should provide defaults when no state is provided', () => {
      const state = {};

      // Case with no value to fall back on
      expect(bookmarks.getCurrentlySyncing(state)).toBeUndefined();

      // Case with a given default
      expect(bookmarks.getCurrentlySyncing(state, 'default_value')).toEqual(
        'default_value',
      );
    });

    it('should retrieve values when state is provided', () => {
      const streamId = 'customers';
      const bookmarkKey = 'datetime';
      const bookmarkValue = 123456789;
      const offsetValue = 'fizzy water';

      const state = {
        bookmarks: {
          [streamId]: {
            [bookmarkKey]: bookmarkValue,
            offset: offsetValue,
          },
        },
        currently_syncing: streamId,
      };

      // Case with no value to fall back on
      expect(bookmarks.getCurrentlySyncing(state)).toEqual(streamId);

      // Case with a given default
      expect(bookmarks.getCurrentlySyncing(state, 'default_value')).toEqual(
        streamId,
      );
    });
  });

  describe('bookmark utils', () => {
    it('should return the correct path when calling `getPath`', () => {
      const streamId = 'customers';
      const path = bookmarks.getPath(streamId);
      const path1 = bookmarks.getPath(streamId, 'test');
      const path2 = bookmarks.getPath(streamId, 'foo', 'bar');

      expect(path).toEqual(`bookmarks.customers`);
      expect(path1).toEqual(`bookmarks.customers.test`);
      expect(path2).toEqual(`bookmarks.customers.foo.bar`);
    });

    it('should return updated state when calling `setState`', () => {
      const streamId = 'customers';
      const state: BookmarksStateType = {};
      const path = bookmarks.getPath(streamId, 'inner');
      const value = 'test';
      const newState = bookmarks.setState(state, path, value);

      expect(newState).toEqual({ bookmarks: { [streamId]: { inner: value } } });
    });
  });
});
