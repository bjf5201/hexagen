import { test, expect } from 'vitest';
import { sum } from 'src/index.ts';

test('should work', () => {
  expect(sum(1, 1)).toBe(2);
});
