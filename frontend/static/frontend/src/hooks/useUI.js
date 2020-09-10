import { useSelector } from 'react-redux';

import { selectErrors, selectFetched, selectLoading } from '../redux/ui';

const useUI = (key, keyNext, initialLoading = true) => {
  const errors = useSelector((s) => selectErrors(s, key));
  const fetched = useSelector((s) => selectFetched(s, key));
  const loading = useSelector((s) => selectLoading(s, key, initialLoading));
  const nextLoading = useSelector((s) => selectLoading(s, keyNext));

  return {
    errors,
    fetched,
    loading,
    nextLoading,
  };
};

export default useUI;
