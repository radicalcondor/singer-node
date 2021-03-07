import { SchemaMessage } from './SchemaMessage';
import { parseMessage } from './parseMessage';
import { SingerSyncError } from '../errors';

describe(SchemaMessage.name, () => {
  it('should successfully parse a message', () => {
    const RAW_MESSAGE =
      '{"type": "SCHEMA", "stream": "users", "schema": {"properties": {"name": {"type": "string"}}, "type": "object"}, "key_properties": ["name"]}';
    const actual = parseMessage(RAW_MESSAGE);
    const expected = new SchemaMessage({
      key_properties: ['name'],
      schema: {
        properties: {
          name: {
            type: 'string',
          },
        },
        type: 'object',
      },
      stream: 'users',
    });

    expect(actual).toBeDefined();
    expect(`${actual}`).toEqual(`${expected}`);
  });

  it('should fail to parse a message with a missing stream', () => {
    const RAW_MESSAGE =
      '{"type": "SCHEMA", "schema": {"type": "object", "properties": {"name": {"type": "string"}}}, "key_properties": ["name"]}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });

  it('should fail to parse a message with a missing schema', () => {
    const RAW_MESSAGE =
      '{"type": "SCHEMA", "stream": "users", "key_properties": ["name"]}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });

  it('should fail to parse a message with missing key_properties', () => {
    const RAW_MESSAGE =
      '{"type": "SCHEMA", "stream": "users", "schema": {"type": "object", "properties": {"name": {"type": "string"}}}}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerSyncError);
  });
});
