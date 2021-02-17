import { StreamTypes } from '../../types';

/**
 * `STATE` messages contain the state that the Tap wishes to persist. The
 * semantics of a STATE value are not part of the specification, and should be
 * determined independently by each Tap.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#state-message
 */
export interface StateType<T> {
  readonly type: StreamTypes.STATE;

  /**
   * Required. The JSON formatted state value.
   */
  value: T;
}

type StateOptions<T> = Omit<StateType<T>, 'type'>;

export class State<T> {
  readonly type = StreamTypes.STATE;
  value: T;

  constructor(options: StateOptions<T>) {
    this.value = options.value;
  }

  toString = () => {
    return JSON.stringify({
      type: this.type,
      value: this.value,
    });
  };
}
