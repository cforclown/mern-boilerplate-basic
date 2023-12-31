import { EXCEPTIONS } from '../constants';
import { ValidationException } from './validation-exception';

const mockLoggerError = jest.fn();
jest.mock('../logger', () => ({
  Logger: {
    error: (message: string): void => mockLoggerError(message)
  }
}));

describe('validation-exception', () => {
  it('should throw ValidationException with the correct code and message', () => {
    const message = 'exception message';
    const { VALIDATION_EXCEPTION: { code, name } } = EXCEPTIONS;
    const exception = new ValidationException(message);
    expect(exception.message).toEqual(message);
    expect(exception.name).toEqual(`[${code}] ${name}`);
  });
});
