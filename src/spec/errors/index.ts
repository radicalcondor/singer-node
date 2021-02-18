import { BaseError } from 'make-error';

/**
 * The base `Error` class for Singer.
 */
export class SingerError extends BaseError {
  /**
   * Create an error with a multi-line error message. The first line is the
   * error's class name. The subsequent lines are the message that class was
   * created with.
   *
   * @param message The error message. Optional
   */
  constructor(message?: string) {
    super(message);
    this.message = [this.constructor.name, message].join('\n');
  }
}

/**
 * The base class of errors encountered before discovery and before sync mode
 */
export class SingerConfigurationError extends SingerError {}

/**
 * The base class of errors encountered in discovery mode
 */
export class SingerDiscoveryError extends SingerError {}

/**
 * The base class of errors encountered in sync mode
 */
export class SingerSyncError extends SingerError {}

/**
 * This error is meant to be thrown when a Tap encounters a retryable request
 */
export class SingerRetryableRequestError extends SingerError {}
