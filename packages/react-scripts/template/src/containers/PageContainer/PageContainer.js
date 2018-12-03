import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const PageContainer = ({ children }) => (
  <div className="PageContainer">
    <Header />
    {children}
  </div>
);
PageContainer.propTypes = propTypes;

export default PageContainer;
