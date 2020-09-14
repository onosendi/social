import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { route } from '../../constants';

import { selectUser } from '../../redux/user';

const AnonymousRoute = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();

  const user = useSelector(selectUser);

  return (
    <Route
      render={(props) => {
        let rendered;
        if (user.username) {
          const next = new URLSearchParams(location.search).get('next');
          rendered = <Redirect to={next || route.home} />;
        } else {
          // eslint-disable-next-line react/jsx-props-no-spreading
          rendered = <Component {...props} />;
        }
        return rendered;
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};

AnonymousRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
};

export default AnonymousRoute;
