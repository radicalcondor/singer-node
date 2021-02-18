import * as errors from "./index";

const MESSAGE = 'An error occurred';

describe('errors', () => {

  it('should throw a SingerError with the correct message', () => {
    try {
      throw new errors.SingerError(MESSAGE);
    } catch (e) {
      expect(e.message).toEqual(`SingerError\n${MESSAGE}`);
    }
  });

  it('should throw a SingerError with the correct multiline message', () => {
    const MULTILINE_MESSAGE = ["Line 1", "Line 2", "Line 3"].join('\n');
    try {
      throw new errors.SingerError(MULTILINE_MESSAGE);
    } catch (e) {
      expect(e.message).toEqual(`SingerError\n${MULTILINE_MESSAGE}`);
    }
  });

  it.skip('should throw a SingerConfigurationError with the correct message', () => {});
  it.skip('should throw a SingerDiscoveryError with the correct message', () => {});
  it.skip('should throw a SingerSyncError with the correct message', () => {});
  it.skip('should throw a SingerRetryableRequestError with the correct message', () => {});
});
