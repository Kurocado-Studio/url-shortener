import { generateRandomString } from 'app/domain/repository';

describe('generateRandomString', () => {
  it('returns a string of the specified length', () => {
    const length = 10;
    const str = generateRandomString(length);
    expect(str).toHaveLength(length);
  });

  it('returns a string with a default length of six characters', () => {
    const str = generateRandomString();
    expect(str).toHaveLength(6);
  });

  it('returns a string containing only allowed characters', () => {
    const allowedChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const str = generateRandomString(12);

    for (const char of str) {
      expect(allowedChars.includes(char)).toBe(true);
    }
  });
});
