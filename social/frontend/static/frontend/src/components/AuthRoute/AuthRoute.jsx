import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { route } from '../../constants';

import { selectUser } from '../../redux/user';

const AuthRoute = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();

  const user = useSelector(selectUser);

  return (
    <Route
      render={(props) => (
        !user.username
          ? <Redirect to={`${route.login}?next=${location.pathname}`} />
          // eslint-disable-next-line react/jsx-props-no-spreading
          : <Component {...props} />
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
};

export default AuthRoute;
