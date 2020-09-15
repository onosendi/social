// Always return an array.
export const makeArray = (arg) => (Array.isArray(arg) ? arg : [arg]);

// If `arg` is `null` or '' return `true`.
export const isEmpty = (arg) => {
  if (typeof arg === 'number' || typeof arg === 'boolean') {
    return false;
  }
  if (typeof arg === 'undefined' || arg === null) {
    return true;
  }
  if (typeof arg.length !== 'undefined') {
    return arg.length === 0;
  }
  return Object.entries(arg).length === 0;
};

export const omit = (obj, key) => {
  const {
    [key]: _,
    ...rest
  } = obj;
  return rest;
};

export const getNested = (obj, ...args) => (
  args.reduce((o, level) => o && o[level], obj)
);

export const reduceById = (arr) => arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

export const reduceToIds = (arr) => (
  arr.reduce((acc, item) => [...acc, item.id], []));

export const pluralize = (number, text) => (number === 1 ? text : `${text}s`);

export const truncate = (string, maxLength) => (string.length > maxLength
  ? `${string.slice(0, maxLength)}...`
  : string);
