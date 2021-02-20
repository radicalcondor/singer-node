import get from 'lodash.get';
import set from 'lodash.set';

export type BookmarksStateType = {
  currently_syncing?: string;
  bookmarks?: {
    [key: string]: any;
    offset?: string;
  };
};

export type BookmarkValue = any;

export const getPath = (tapStreamId: string, ...paths: string[]) => 
  `bookmarks.${tapStreamId}${paths.length > 0 ? `.${paths.join('.')}` : ''}`

export const setState = (
  state: BookmarksStateType,
  path: string,
  value?: any
): BookmarksStateType => 
  set({...state}, path, value);

export const writeBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
  val: BookmarkValue,
): BookmarksStateType =>
  setState(state, getPath(tapStreamId, key), val);

export const getBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
  _default?: BookmarkValue,
): BookmarkValue => get(state, getPath(tapStreamId, key), _default);

export const clearBookmark = (
  state: BookmarksStateType,
  tapStreamId: string,
  key: string,
): BookmarksStateType => 
  setState(state, getPath(tapStreamId, key));

export const resetStream = (
  state: BookmarksStateType,
  tapStreamId: string,
): BookmarksStateType => 
  setState(state, getPath(tapStreamId), {});

export const setOffset = (
  state: BookmarksStateType,
  tapStreamId: string,
  offsetKey: string,
  offsetValue: BookmarkValue,
): BookmarksStateType => 
  setState(state, getPath(tapStreamId, 'offset', offsetKey), offsetValue);

export const clearOffset = (
  state: BookmarksStateType,
  tapStreamId: string,
): BookmarksStateType => 
  setState(state, getPath(tapStreamId, 'offset'), {});

export const getOffset = <T>(
  state: BookmarksStateType,
  tapStreamId: string,
  defaultValue?: T,
): BookmarksStateType =>
  get(state, `${getPath(tapStreamId, 'offset')}`, defaultValue);

export const setCurrentlySyncing = (
  state: BookmarksStateType,
  tapStreamId: string,
): BookmarksStateType => ({
  ...state, 
  currently_syncing: tapStreamId,
});

export const getCurrentlySyncing = (
  state: BookmarksStateType,
  defaultValue: any = undefined,
): BookmarksStateType => get(state, 'currently_syncing', defaultValue);
