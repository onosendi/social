import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Local
import { getUser, key, selectProfileUser } from '../redux/profile';

import useUI from './useUI';

const useProfileUser = (slug) => {
  const dispatch = useDispatch();

  const profileUser = useSelector((s) => selectProfileUser(s, slug));

  const {
    fetched,
    loading: profileUserLoading,
  } = useUI(key.profileUser(slug));

  React.useEffect(() => {
    if (!fetched) {
      dispatch(getUser(slug));
    }
  }, [slug]);

  return { profileUser, profileUserLoading };
};

export default useProfileUser;
