import { Record } from './Record';

import { parseMessage } from './index';

describe('Record', () => {
  it('should successfully parse a message', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users"}';
    const parsedMessage = parseMessage(RAW_MESSAGE);
    const record = new Record({
      record: {
        name: 'foo',
      },
      stream: 'users',
    });

    expect(parsedMessage).toBeDefined();
    expect(`${parsedMessage}`).toEqual(`${record}`);
  });
  it.skip('should successfully parse a message with a version', () => {});
  it.skip('should fail to parse a message with a date without a timezone', () => {});
  it.skip('should successfully parse a message with a date with a timezone', () => {});
  it.skip('should successfully parse a message with a date with a timezone on macOS', () => {});
  it.skip('should fail to parse a message with a missing record', () => {});
  it.skip('should fail to parse a message with a missing stream', () => {});
});
