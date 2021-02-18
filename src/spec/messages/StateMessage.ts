import * as yup from 'yup';

import { MessageType, MessageTypes } from './Message';
import { SingerSyncError } from '../errors';

const schema = yup.object().shape({
  value: yup.mixed().optional(),
});

/**
 * `STATE` messages contain the state that the Tap wishes to persist. The
 * semantics of a STATE value are not part of the specification, and should be
 * determined independently by each Tap.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#state-message
 */
export interface StateMessageType<T> {
  readonly type: MessageTypes.STATE;

  /**
   * Required. The JSON formatted state value.
   */
  value: T;
}

type StateOptions<T> = Omit<StateMessageType<T>, 'type'>;

export class StateMessage<T> implements MessageType, StateMessageType<T> {
  readonly type = MessageTypes.STATE;
  value: StateMessageType<T>['value'];

  constructor(options: StateOptions<T>) {
    try {
      schema.validateSync(options);
    } catch (e) {
      throw new SingerSyncError(e.message);
    }
    this.value = options.value;
  }

  toString = () => {
    return JSON.stringify({
      type: this.type,
      value: this.value,
    });
  };
}
