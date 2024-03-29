import * as yup from 'yup';

import { MessageType, MessageTypes } from './Message';
import { SingerSyncError } from '../errors';

const schema = yup.object().required();

/**
 * `STATE` messages contain the state that the Tap wishes to persist. The
 * semantics of a STATE value are not part of the specification, and should be
 * determined independently by each Tap.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SPEC.md#state-message
 */
export interface StateMessageType<T = unknown> extends MessageType {
  readonly type: MessageTypes.STATE;

  /**
   * Required. The JSON formatted state value.
   */
  value: T;
}

export class StateMessage<T = unknown> implements StateMessageType<T> {
  readonly type = MessageTypes.STATE;

  value: StateMessageType<T>['value'];

  constructor(value: StateMessageType<T>['value']) {
    try {
      schema.validateSync(value);
    } catch (e) {
      throw new SingerSyncError(e.message);
    }
    this.value = value;
  }

  toString = (): string => {
    return JSON.stringify({
      type: this.type,
      value: this.value,
    });
  };
}
