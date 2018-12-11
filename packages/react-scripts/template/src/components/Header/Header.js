import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Header.scss';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export const Header = ({ match }) => {
  const links = [
    {
      display: 'Hello!',
      link: '/hello',
    },
    {
      display: 'APICall',
      link: '/apicall',
    },
    {
      display: 'Salesforce APICall',
      link: '/sfapicall',
    },
  ];

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <header className="Header">
      <nav className="HeaderNav">
        <ul>
          {links.map(item => {
            const classes = ['Header__link'];
            if (item.link === match.url) {
              classes.push('Header__link--selected');
            }

            return (
              <li key={`link-${item.display}`}>
                <Link className={classes.join(' ')} to={item.link}>
                  {item.display}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
Header.propTypes = propTypes;

export default withRouter(Header);
