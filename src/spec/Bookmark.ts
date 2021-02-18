import get from 'lodash.get';
import { StateType } from '..';


type BookmarkState = StateType<{ bookmarks: { [key:string]: any} } | undefined>;

type BookmarkValue = any;

const  getNewState = <T>(state:StateType<any>, newValue: any): StateType<T> => ({
  ...state,
  value: {
    ...state.value,
    ...newValue
  }
});

const write_bookmark = (state: BookmarkState, tapStreamId: string, key: string, val: BookmarkValue): BookmarkState =>
  getNewState(state, { bookmarks: { [tapStreamId]: { [key]: val } }});

const get_bookmark = (state: BookmarkState, tapStreamId: string, key: string, _default?: BookmarkValue): BookmarkValue =>
   get(state.value, `bookmarks.${tapStreamId}.${key}`, _default);

export const bookmarks = {
  write_bookmark,
  get_bookmark,
}

/*
  clear_bookmark = <T>(state: StateType<T>, tapStreamId: string, key: string): StateType<T> => state;
  reset_stream = <T>(state: StateType<T>, tapStreamId: string): StateType<T> => state;
  set_offset = <T>(state: StateType<T>, tapStreamId: string, offsetKey: string, offsetValue: any): StateType<T> => state;
  clear_offset = <T>(state: StateType<T>, tapStreamId: string): StateType<T> => state;
  get_offset = <T>(state: StateType<T>, tapStreamId: string, _default:any = null): StateType<T> => state;
  set_currently_syncing = <T>(state: StateType<T>, tapStreamId: string): StateType<T> => state;
  get_currently_syncing = <T>(state: StateType<T>, _default:any =null): StateType<T> => state;
*/