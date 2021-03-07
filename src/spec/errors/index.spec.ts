import * as errors from '.';

const MESSAGE = 'An error occurred';
const MULTILINE_MESSAGE = ['Line 1', 'Line 2', 'Line 3'].join('\n');

describe('errors', () => {
  it(`should throw a ${errors.SingerError.name} with the correct message`, () => {
    expect(() => {
      throw new errors.SingerError(MESSAGE);
    }).toThrow(`SingerError\n${MESSAGE}`);
  });

  it(`should throw a ${errors.SingerError.name} with the correct multiline message`, () => {
    expect(() => {
      throw new errors.SingerError(MULTILINE_MESSAGE);
    }).toThrow(`SingerError\n${MULTILINE_MESSAGE}`);
  });

  it(`should throw a ${errors.SingerConfigurationError.name} with the correct message`, () => {
    expect(() => {
      throw new errors.SingerConfigurationError(MESSAGE);
    }).toThrow(`SingerConfigurationError\n${MESSAGE}`);
  });

  it(`should throw a ${errors.SingerDiscoveryError.name} with the correct message`, () => {
    expect(() => {
      throw new errors.SingerDiscoveryError(MESSAGE);
    }).toThrow(`SingerDiscoveryError\n${MESSAGE}`);
  });

  it(`should throw a ${errors.SingerSyncError.name} with the correct message`, () => {
    expect(() => {
      throw new errors.SingerSyncError(MESSAGE);
    }).toThrow(`SingerSyncError\n${MESSAGE}`);
  });

  it(`should throw a ${errors.SingerRetryableRequestError.name} with the correct message`, () => {
    expect(() => {
      throw new errors.SingerRetryableRequestError(MESSAGE);
    }).toThrow(`SingerRetryableRequestError\n${MESSAGE}`);
  });
});
