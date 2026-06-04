import { useCallback, useEffect, useMemo, useState } from 'react';
import { cloneStoredValues, sanitizeStoredValues } from '../utils/persistentState';

const readStoredState = (storageKey, initialValues) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      values: cloneStoredValues(initialValues),
      recoveredFromStorageError: false,
    };
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return {
        values: cloneStoredValues(initialValues),
        recoveredFromStorageError: false,
      };
    }

    const parsed = JSON.parse(raw);
    const sanitizedState = sanitizeStoredValues(initialValues, parsed);

    return {
      values: sanitizedState.values,
      recoveredFromStorageError: sanitizedState.recovered,
    };
  } catch {
    return {
      values: cloneStoredValues(initialValues),
      recoveredFromStorageError: true,
    };
  }
};

const toSetterName = (key) => `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;

export const usePersistentCalculatorState = (storageKey, initialValues) => {
  const initialSnapshot = useMemo(() => JSON.stringify(initialValues), [initialValues]);
  const [initialState] = useState(() => readStoredState(storageKey, initialValues));
  const [values, setValues] = useState(initialState.values);
  const [recoveredFromStorageError, setRecoveredFromStorageError] = useState(
    initialState.recoveredFromStorageError
  );

  const hasSavedData = useMemo(
    () => JSON.stringify(values) !== initialSnapshot,
    [initialSnapshot, values]
  );

  useEffect(() => {
    if (recoveredFromStorageError) {
      console.warn(
        `[storage] Da phat hien du lieu luu khong hop le cho "${storageKey}" va tu dong khoi phuc ve trang thai an toan.`
      );
    }
  }, [recoveredFromStorageError, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      if (hasSavedData) {
        window.localStorage.setItem(storageKey, JSON.stringify(values));
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignore storage quota or privacy-mode errors and keep the form usable.
    }
  }, [hasSavedData, storageKey, values]);

  const setField = useCallback((key, nextValue) => {
    setValues((previousValues) => ({
      ...previousValues,
      [key]:
        typeof nextValue === 'function'
          ? nextValue(previousValues[key])
          : nextValue,
    }));
  }, []);

  const generatedSetters = useMemo(
    () =>
      Object.fromEntries(
        Object.keys(initialValues).map((key) => [
          toSetterName(key),
          (nextValue) => setField(key, nextValue),
        ])
      ),
    [initialValues, setField]
  );

  const clearSavedForm = useCallback(() => {
    setValues(cloneStoredValues(initialValues));
    setRecoveredFromStorageError(false);

    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors when clearing saved values.
    }
  }, [initialValues, storageKey]);

  const dismissStorageRecoveryNotice = useCallback(() => {
    setRecoveredFromStorageError(false);
  }, []);

  return {
    values,
    generatedSetters,
    hasSavedData,
    clearSavedForm,
    recoveredFromStorageError,
    dismissStorageRecoveryNotice,
  };
};
