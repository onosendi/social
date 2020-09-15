import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

// Local
import Loading from '../Loading';
import Routes from '../Routes';
import Toast from '../Toast';

import store from '../../redux/store';
import { setUser } from '../../redux/user';
import { selectToast } from '../../redux/ui';

// Persist user data in Redux if the user is authenticated. The user's
// data is loaded into a dataset from Django's templating system.
const { user } = document.getElementById('app').dataset;
try {
  const userJson = JSON.parse(user);
  store.dispatch(setUser(userJson));
} catch {
  // Do nothing.
}

const App = () => {
  const toast = useSelector(selectToast);

  return (
    <>
      {toast.message
        && (
          <Toast
            message={toast.message}
            severity={toast.severity}
          />
        )}

      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </>
  );
};

export default App;
