import trueFunction from './true-function';

describe('trueFunction', (): void => {
  it('should return true', (): void => {
    expect(trueFunction()).toBe(true);
  });
});
