const STORAGE_PREFIX = 'vnuhcm-calculator:';

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export const cloneStoredValues = (values) => JSON.parse(JSON.stringify(values));

const sanitizePrimitiveValue = (template, candidate) => {
  if (typeof template === 'number') {
    return typeof candidate === 'number' && Number.isFinite(candidate) ? candidate : template;
  }

  if (typeof template === 'string') {
    return typeof candidate === 'string' ? candidate : template;
  }

  if (typeof template === 'boolean') {
    return typeof candidate === 'boolean' ? candidate : template;
  }

  return candidate ?? template;
};

const sanitizeValueByTemplate = (template, candidate) => {
  if (Array.isArray(template)) {
    if (!Array.isArray(candidate) || candidate.length !== template.length) {
      return {
        value: cloneStoredValues(template),
        recovered: candidate !== undefined,
      };
    }

    let recovered = false;
    const normalizedArray = template.map((item, index) => {
      const result = sanitizeValueByTemplate(item, candidate[index]);
      recovered ||= result.recovered;
      return result.value;
    });

    return { value: normalizedArray, recovered };
  }

  if (isPlainObject(template)) {
    if (!isPlainObject(candidate)) {
      return {
        value: cloneStoredValues(template),
        recovered: candidate !== undefined,
      };
    }

    let recovered = false;
    const normalizedObject = {};

    Object.keys(template).forEach((key) => {
      const result = sanitizeValueByTemplate(template[key], candidate[key]);
      recovered ||= result.recovered;
      normalizedObject[key] = result.value;
    });

    return { value: normalizedObject, recovered };
  }

  const value = sanitizePrimitiveValue(template, candidate);
  return { value, recovered: value !== candidate };
};

export const sanitizeStoredValues = (initialValues, storedValues) => {
  if (!isPlainObject(storedValues)) {
    return {
      values: cloneStoredValues(initialValues),
      recovered: storedValues !== undefined,
    };
  }

  let recovered = false;
  const normalizedValues = cloneStoredValues(initialValues);

  Object.keys(initialValues).forEach((key) => {
    const result = sanitizeValueByTemplate(initialValues[key], storedValues[key]);
    recovered ||= result.recovered;
    normalizedValues[key] = result.value;
  });

  return {
    values: normalizedValues,
    recovered,
  };
};

export const clearCalculatorStorage = (storage = globalThis?.localStorage) => {
  if (!storage) {
    return;
  }

  const keysToDelete = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => storage.removeItem(key));
};

export const isCalculatorStorageKey = (key) => typeof key === 'string' && key.startsWith(STORAGE_PREFIX);
