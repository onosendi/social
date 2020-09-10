import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { APP_NAME } from '../../constants';

const PageTitle = ({ title }) => (
  <Helmet>
    <title>
      {title}
      {' · '}
      {APP_NAME}
    </title>
  </Helmet>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
