import pkg from '../package.json';

import * as singer from '.';

describe(pkg.name, () => {
  it('should import successfully', () => {
    expect(singer).toBeDefined();
  });
});
