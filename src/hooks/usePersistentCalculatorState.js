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

  const exportData = useCallback(() => {
    const data = {
      calculatorKey: storageKey,
      timestamp: Date.now(),
      values,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storageKey.replace('vnuhcm-calculator:', '')}-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [storageKey, values]);

  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.calculatorKey !== storageKey) {
            const currentTab = storageKey.replace('vnuhcm-calculator:', '').toUpperCase();
            const fileTab = data.calculatorKey ? data.calculatorKey.replace('vnuhcm-calculator:', '').toUpperCase() : 'Khác';
            reject(new Error(`Tệp dữ liệu này thuộc về tab ${fileTab}, không phù hợp với tab hiện tại (${currentTab}). Vui lòng chuyển sang tab ${fileTab} để nhập điểm.`));
            return;
          }
          const sanitizedState = sanitizeStoredValues(initialValues, data.values);
          setValues(sanitizedState.values);
          resolve();
        } catch (error) {
          console.error('[Import Error]', error);
          reject(new Error('Tệp dữ liệu không hợp lệ hoặc bị lỗi.'));
        }
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc tệp.'));
      reader.readAsText(file);
    });
  }, [storageKey, initialValues]);

  return {
    values,
    generatedSetters,
    hasSavedData,
    clearSavedForm,
    exportData,
    importData,
    recoveredFromStorageError,
    dismissStorageRecoveryNotice,
  };
};
