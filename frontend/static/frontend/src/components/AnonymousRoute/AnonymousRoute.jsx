import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { route } from '../../constants';

import { selectUser } from '../../redux/user';

const AnonymousRoute = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(selectUser);

  return (
    <Route
      render={(props) => (
        user.username
          ? <Redirect to={route.home} />
          // eslint-disable-next-line react/jsx-props-no-spreading
          : <Component {...props} />
      )}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

AnonymousRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AnonymousRoute;
