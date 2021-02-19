import { StateMessage } from './StateMessage';
import { parseMessage } from './index';
import { SingerSyncError } from '../errors';

describe(StateMessage.name, () => {
  it('should successfully parse a message', () => {
    const RAW_MESSAGE = '{"type": "STATE", "value": {"seq": 1}}';
    const actual = parseMessage(RAW_MESSAGE);
    const expected = new StateMessage({
      seq: 1,
    });

    expect(actual).toBeDefined();
    expect(`${actual}`).toEqual(`${expected}`);
  });

  it('should fail to parse a message with a missing value', () => {
    const RAW_MESSAGE = '{"type": "STATE"}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });
});
