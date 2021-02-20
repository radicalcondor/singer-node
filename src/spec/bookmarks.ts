import has from 'lodash.has';
import get from 'lodash.get';
import set from 'lodash.set';

export type BookmarksStateType = {
  currently_syncing?: string;
  bookmarks?: {
    [key: string]: any;
    offset?: string;
  };
};

// export type BookmarksType = StateMessageType<BookmarksType>;

export type BookmarkValue = any;

const getNewState = (
  state: BookmarksStateType,
  newState: any,
): BookmarksStateType => ({
  ...state,
  ...newState,
});

const generateBookmarkKey = (tapStreamId: string, key?: string) => {
  let result = `bookmarks.${tapStreamId}`;

  if (key) {
    result = `${result}.${key}`;
  }

  return result;
};

export const writeBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
  val: BookmarkValue,
): BookmarksStateType =>
  getNewState(state, { bookmarks: { [tapStreamId]: { [key]: val } } });

export const getBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
  _default?: BookmarkValue,
): BookmarkValue => get(state, generateBookmarkKey(tapStreamId, key), _default);

export const clearBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
): BookmarksStateType => {
  const bookmarkKey = generateBookmarkKey(tapStreamId, key);
  const nextState = { ...state };
  if (has(nextState, bookmarkKey)) {
    set(nextState, bookmarkKey, undefined);
  }
  return nextState;
};

// export const resetStream = (
//   state: BookmarksStateType,
//   tapStreamId: string,
// ): BookmarksStateType => {
//   return state;
// };

// export const setOffset = (
//   state: BookmarksStateType,
//   tapStreamId: string,
//   offsetKey: string,
//   offsetValue: BookmarkValue,
// ): BookmarksStateType => {
//   return state;
// };

// export const clearOffset = (
//   state: BookmarksStateType,
//   tapStreamId: string,
// ): BookmarksStateType => {
//   return state;
// };

export const getOffset = <T>(
  state: BookmarksStateType,
  tapStreamId: string,
  defaultValue?: T,
): BookmarksStateType =>
  get(state, `${generateBookmarkKey(tapStreamId)}.offset`, defaultValue);

// export const setCurrentlySyncing = (
//   state: BookmarksStateType,
//   tapStreamId: string,
// ): BookmarksStateType => {
//   return state;
// };

export const getCurrentlySyncing = (
  state: BookmarksStateType,
  defaultValue: any = undefined,
): BookmarksStateType => get(state, 'currently_syncing', defaultValue);
