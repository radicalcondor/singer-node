import { parseMessage } from './parseMessage';
import { SingerError } from '../errors';

describe(`#${parseMessage.name}`, () => {
  it('should fail to parse invalid JSON', () => {
    const RAW_MESSAGE = '{"foo":"bar"';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerError);
  });

  it('should fail to parse an invalid message', () => {
    const RAW_MESSAGE = '{"foo":"bar"}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerError);
  });

  it('should fail to parse a message with an invalid type', () => {
    const RAW_MESSAGE = '{"type":"FOO"}';
    expect(() => parseMessage(RAW_MESSAGE)).toThrow(SingerError);
  });
});
