import { StateMessageType } from './messages/StateMessage';
import * as bookmarks from './bookmarks';
import { MessageTypes } from './messages/Message';

describe('bookmarks', () => {
  describe(`#${bookmarks.getBookmark.name}`, () => {
    it('should provide defaults when no state is provided', () => {
      const state = {} as StateMessageType<undefined>;

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
      const state = {
        value: {
          bookmarks: {},
        },
        type: MessageTypes.STATE,
      } as StateMessageType<{ bookmarks: any }>;

      // Case with no value to fall back on
      expect(
        bookmarks.getBookmark(state.value.bookmarks, 'some_stream', 'my_key'),
      ).toBeUndefined();

      // Case with a given default
      expect(
        bookmarks.getBookmark(
          state.value.bookmarks,
          'some_stream',
          'my_key',
          'default_value',
        ),
      ).toEqual('default_value');
    });
    it('should retrieve values when state is provided', () => {
      const streamId = 'customers';
      const bookmarkKey = 'datetime';
      const bookmarkValue = 123456789;

      const state = {
        value: {
          bookmarks: {
            [streamId]: {
              [bookmarkKey]: bookmarkValue,
            },
          },
        },
        type: MessageTypes.STATE,
      } as StateMessageType<{ bookmarks: { customers: { datetime: number } } }>;

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

  describe('#getOffset', () => {
    it('should provide defaults when no state is provided', () => {});
    it('should provide defaults when no bookmarks exist', () => {});
    it('should retrieve values when state is provided', () => {});
  });

  describe('#getCurrentlySyncing', () => {
    it('should provide defaults when no state is provided', () => {});
    it('should retrieve values when state is provided', () => {});
  });
});
