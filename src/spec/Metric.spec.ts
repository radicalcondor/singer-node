import { Counter, TagStatuses, Timer } from './Metric';

describe(Counter.name, () => {
  it('should successfully emit a counter metric message', () => {
    const actual = new Counter({
      metric: 'record_count',
      tags: {
        endpoint: 'users',
      },
      value: 12345,
    }).toString();
    const expected = `INFO METRIC: {"metric":"record_count","tags":{"endpoint":"users"},"type":"counter","value":12345}`;

    expect(actual).toEqual(expected);
  });
});

describe(Timer.name, () => {
  it('should successfully emit a timer metric message', () => {
    const actual = new Timer({
      metric: 'request_duration',
      tags: {
        endpoint: 'users',
        status: TagStatuses.SUCCEEDED,
      },
      value: 1.23,
    }).toString();
    const expected = `INFO METRIC: {"metric":"request_duration","tags":{"endpoint":"users","status":"succeeded"},"type":"counter","value":1.23}`;

    expect(actual).toEqual(expected);
  });
});
