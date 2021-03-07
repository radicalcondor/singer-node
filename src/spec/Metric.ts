/**
 * Possible metric types for an event
 */
export enum MetricTypes {
  COUNTER = 'counter',
  TIMER = 'timer',
}

/**
 * Possible statuses for an event's tags
 */
export enum TagStatuses {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

/**
 * For consistency's sake, we recommend using the following tags when they are
 * relevant. Note that for many metrics, many of those tags will not be
 * relevant.
 */
export interface TagsType {
  [key: string]: string | number | undefined;

  /**
   * For a Tap that pulls data from an HTTP API, this should be a descriptive
   * name for the endpoint.
   *
   * @example users
   * @example deals
   * @example orders
   */
  endpoint?: string;

  /* eslint-disable camelcase */

  /**
   * The HTTP status code.
   *
   * @example 200
   * @example 500
   */
  http_status_code?: number;

  /**
   * For a process that we are timing, some description of the type of the job.
   *
   * For example, if we have a Tap that does a POST to an HTTP API to generate a
   * report and then polls with a GET until the report is done, we could use a
   * job type of "run_report".
   *
   * @example run_report
   */
  job_type?: string;

  /* eslint-enable camelcase */

  /**
   * The status of the event. Can be either "succeeded" or "failed".
   */
  status?: TagStatuses;
}

/**
 * A Tap should periodically emit structured log messages containing metrics
 * about read operations. Consumers of the Tap's logs can parse these metrics
 * out of the logs for monitoring or analysis.
 *
 * @link https://github.com/singer-io/getting-started/blob/master/docs/SYNC_MODE.md#metric-messages
 */
export interface MetricType {
  /**
   * The type of the metric. Indicates how consumers of the data should
   * interpret the value field.
   */
  type: MetricTypes;

  /**
   * The name of the metric. This should consist only of letters, numbers,
   * underscore, and dash characters.
   *
   * @example http_request_duration
   */
  metric: string;

  /**
   * The value of the datapoint, as either an integer or a float.
   *
   * @example 1234
   * @example 1.234
   */
  value: number;

  /**
   * Mapping of tags describing the data. The keys can be any strings consisting
   * solely of letters, numbers, underscores, and dashes.
   */
  tags: TagsType;
}

export class Metric implements MetricType {
  type: MetricType['type'];

  metric: MetricType['metric'];

  value: MetricType['value'];

  tags: MetricType['tags'];

  constructor(options: MetricType) {
    this.type = options.type;
    this.metric = options.metric;
    this.value = options.value;
    this.tags = options.tags;
  }

  toString = (): string => {
    return `INFO METRIC: ${JSON.stringify({
      metric: this.metric,
      tags: this.tags,
      type: this.type,
      value: this.value,
    })}`;
  };
}

export interface CounterType extends MetricType {
  type: MetricTypes.COUNTER;
}

/**
 * This would print a metric like this:
 *
 * ```json
 * {
 *   "type":   "counter",
 *   "metric": "record_count",
 *   "value":   12345,
 *   "tags": {
 *     "endpoint": "users",
 *   }
 * }
 * ```
 */
export class Counter extends Metric {
  constructor(options: Omit<CounterType, 'type'>) {
    super({
      type: MetricTypes.COUNTER,
      ...options,
    });
  }
}

export interface TimerType extends MetricType {
  type: MetricTypes.TIMER;
}

/**
 * Produces metrics about the duration of operations.
 *
 * ```json
 * {
 *    "type": "timer",
 *    "metric": "request_duration",
 *    "value": 1.23,
 *    "tags": {
 *      "endpoint": "users",
 *      "status": "succeeded"
 *    }
 * }
 * ```
 */
export class Timer extends Metric {
  constructor(options: Omit<CounterType, 'type'>) {
    super({
      type: MetricTypes.COUNTER,
      ...options,
    });
  }
}
