import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clearCalculatorStorage,
  isCalculatorStorageKey,
  sanitizeStoredValues,
} from '../src/utils/persistentState.js';

test('sanitizeStoredValues giu lai du lieu dung kieu va phuc hoi du lieu sai kieu', () => {
  const initialValues = {
    score: '',
    enabled: false,
    weights: [0, 0, 0],
    meta: {
      label: 'default',
    },
  };

  const storedValues = {
    score: '28.5',
    enabled: 'yes',
    weights: [1, 'bad', 3],
    meta: null,
  };

  const result = sanitizeStoredValues(initialValues, storedValues);

  assert.equal(result.recovered, true);
  assert.deepEqual(result.values, {
    score: '28.5',
    enabled: false,
    weights: [1, 0, 3],
    meta: {
      label: 'default',
    },
  });
});

test('clearCalculatorStorage chi xoa key cua ung dung', () => {
  const storage = {
    keys: ['vnuhcm-calculator:hcmus', 'another-app:key', 'vnuhcm-calculator:uel'],
    removed: [],
    get length() {
      return this.keys.length;
    },
    key(index) {
      return this.keys[index] ?? null;
    },
    removeItem(key) {
      this.removed.push(key);
    },
  };

  clearCalculatorStorage(storage);

  assert.deepEqual(storage.removed, [
    'vnuhcm-calculator:hcmus',
    'vnuhcm-calculator:uel',
  ]);
  assert.equal(isCalculatorStorageKey('vnuhcm-calculator:iu'), true);
  assert.equal(isCalculatorStorageKey('another-app:key'), false);
});
