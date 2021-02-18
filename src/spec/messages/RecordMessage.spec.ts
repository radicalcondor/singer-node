import { RecordMessage } from './RecordMessage';

import { parseMessage } from './index';

describe(RecordMessage.name, () => {
  it('should successfully parse a message', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users"}';
    const parsedMessage = parseMessage(RAW_MESSAGE);
    const record = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
    });

    expect(parsedMessage).toBeDefined();
    expect(`${parsedMessage}`).toEqual(`${record}`);
  });

  it.skip('should successfully parse a message with a version', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2}';

    const parsedMessage = parseMessage(RAW_MESSAGE);
    const record = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
      // @ts-ignore
      version: 2,
    });

    expect(parsedMessage).toBeDefined();
    expect(`${parsedMessage}`).toEqual(`${record}`);
  });

  it.skip('should fail to parse a message with a date without a timezone', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2, "time_extracted": "1970-01-02T00:00:00"}';
    try {
      parseMessage(RAW_MESSAGE);
    } catch (e) {
      // Throw an error because datetime doesn't include timezone
    }
  });

  it('should successfully parse a message with a date with a timezone', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2, "time_extracted": "1970-01-02T00:00:00.000Z"}';

    const parsedMessage = parseMessage(RAW_MESSAGE);
    const record = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
      // @ts-ignore
      version: 2,
      time_extracted: new Date('1970-01-02T00:00:00.000Z'),
    });

    expect(parsedMessage).toBeDefined();
    expect(`${parsedMessage}`).toEqual(`${record}`);
  });

  /**
   * @TODO Not sure this test behaves the same way in Node as it does in Python. Investigate
   */
  it.skip('should successfully parse a message with a date with a timezone on macOS', () => {
    const record = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
      // @ts-ignore
      version: 2,
      time_extracted: new Date('1970-01-02T00:00:00.000Z'),
    });

    expect(record.time_extracted).toEqual('1970-01-02T00:00:00.000000Z');
  });

  it('should fail to parse a message with a missing record', () => {
    const RAW_MESSAGE = '{"type": "RECORD", "stream": "users"}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow();
  });

  it('should fail to parse a message with a missing stream', () => {
    const RAW_MESSAGE = '{"type": "RECORD", "record": {"name": "foo"}}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow();
  });
});
