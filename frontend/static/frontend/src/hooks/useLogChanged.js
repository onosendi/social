import React from 'react';

const useLogChanged = (keyValue) => {
  const [[key, value]] = Object.entries(keyValue);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`Change detected for "${key}"`);
  }, [key, value]);
};

export default useLogChanged;
