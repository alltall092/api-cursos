import { ErrorMiddlewareMiddleware } from './error-middleware.middleware';

describe('ErrorMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new ErrorMiddlewareMiddleware()).toBeDefined();
  });
});
