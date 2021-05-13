/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import ApplicationLayout from '../layouts/ApplicationLayout';

export default function ApplicationRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <ApplicationLayout>
          <Component {...props} />
        </ApplicationLayout>
      )}
    />
  );
}

ApplicationRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
