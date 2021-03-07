import { RecordMessage } from './RecordMessage';

import { parseMessage } from './parseMessage';
import { SingerSyncError } from '../errors';

describe(RecordMessage.name, () => {
  it('should successfully parse a message', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users"}';
    const actual = parseMessage(RAW_MESSAGE);
    const expected = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
    });

    expect(actual).toBeDefined();
    expect(`${actual}`).toEqual(`${expected}`);
  });

  it('should successfully parse a message with a version', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2}';

    const actual = parseMessage(RAW_MESSAGE);
    const expected = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
      version: 2,
    });

    expect(actual).toBeDefined();
    expect(`${actual}`).toEqual(`${expected}`);
  });

  /**
   * @TODO Doesn't seem to throw error
   */
  it.skip('should fail to parse a message with a date without a timezone', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2, "time_extracted": "1970-01-02T00:00:00"}';

    expect(() => {
      parseMessage(RAW_MESSAGE);
    }).toThrow(`SingerError`);
  });

  it('should successfully parse a message with a date with a timezone', () => {
    const RAW_MESSAGE =
      '{"type": "RECORD", "record": {"name": "foo"}, "stream": "users", "version": 2, "time_extracted": "1970-01-02T00:00:00.000Z"}';

    const actual = parseMessage(RAW_MESSAGE);
    const expected = new RecordMessage({
      record: {
        name: 'foo',
      },
      stream: 'users',
      time_extracted: new Date('1970-01-02T00:00:00.000Z'),
      version: 2,
    });

    expect(actual).toBeDefined();
    expect(`${actual}`).toEqual(`${expected}`);
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
      time_extracted: new Date('1970-01-02T00:00:00.000Z'),
      version: 2,
    });

    expect(record.time_extracted).toEqual('1970-01-02T00:00:00.0000Z');
  });

  it('should fail to parse a message with a missing record', () => {
    const RAW_MESSAGE = '{"type": "RECORD", "stream": "users"}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });

  it('should fail to parse a message with a missing stream', () => {
    const RAW_MESSAGE = '{"type": "RECORD", "record": {"name": "foo"}}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });
});
